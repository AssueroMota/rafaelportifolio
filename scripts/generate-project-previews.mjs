import { chromium } from "playwright";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";

// Optional asset tooling: run against the local Vite server with Playwright installed.
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
await mkdir("public/projects", { recursive: true });

async function captureStore() {
  const cache = join(process.env.LOCALAPPDATA || "", "ms-playwright");
  const entries = process.env.FFMPEG_PATH ? [] : await readdir(cache);
  const ffmpeg = process.env.FFMPEG_PATH || join(cache, entries.find((entry) => entry.startsWith("ffmpeg-")), "ffmpeg-win64.exe");
  const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
  await page.goto("https://next.medusajs.com/dk/products/hoodie", { waitUntil: "networkidle" });
  await page.screenshot({ path: "public/projects/medusa-poster.png" });
  const encoder = spawn(ffmpeg, ["-y", "-f", "image2pipe", "-c:v", "mjpeg", "-r", "10", "-i", "pipe:0", "-c:v", "libvpx", "-b:v", "900k", "-an", "public/projects/medusa-demo.webm"], { windowsHide: true });
  let encoderError = "";
  encoder.stderr.on("data", (data) => { encoderError += data; });
  const completed = new Promise((resolve, reject) => {
    encoder.on("error", reject);
    encoder.on("close", (code) => code === 0 ? resolve() : reject(new Error(encoderError)));
  });
  completed.catch(() => {});
  try {
    for (let frame = 0; frame < 90; frame++) {
      if (frame === 18) await page.getByText("Product Information", { exact: true }).click();
      if (frame === 42) await page.getByText("Shipping & Returns", { exact: true }).click();
      if (frame === 64) await page.mouse.wheel(0, 380);
      await new Promise((resolve, reject) => {
        page.screenshot({ type: "jpeg", quality: 88 }).then((frameBytes) => encoder.stdin.write(frameBytes, (error) => error ? reject(error) : resolve()), reject);
      });
    }
  } finally {
    encoder.stdin.end();
    await completed;
    await page.close();
  }
}

try {
  for (const project of [
    { name: "cal-diy", image: "cal-diy.gif", gif: true },
    { name: "activepieces", image: "activepieces-demo.gif", gif: true },
    { name: "plane", image: "plane.webp" },
    { name: "immich", image: "immich.png" },
    { name: "firefly", image: "firefly.png" },
    { name: "medusa", image: "medusa.png" },
  ]) {
    if (process.argv[2] && process.argv[2] !== project.name) continue;
    if (project.name === "medusa") {
      await captureStore();
      console.log("medusa: public storefront recording ready");
      continue;
    }
    const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
    await page.goto(base);
    const result = await page.evaluate(async (project) => {
      const canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      const response = await fetch(`/projects/${project.image}`);
      const bytes = await response.arrayBuffer();
      let source;
      let decoder;
      if (project.gif) {
        decoder = new ImageDecoder({ data: bytes, type: "image/gif" });
        await decoder.tracks.ready;
        source = (await decoder.decode({ frameIndex: 0 })).image;
      } else {
        source = await createImageBitmap(new Blob([bytes]));
      }
      const w = source.displayWidth || source.width;
      const h = source.displayHeight || source.height;
      const smooth = (t) => {
        const v = Math.max(0, Math.min(1, t));
        return v * v * (3 - 2 * v);
      };

      function crop(rect, alpha = 1) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(source, rect[0] * w, rect[1] * h, rect[2] * w, rect[3] * h, 0, 0, 960, 600);
        ctx.restore();
      }

      function fit() {
        ctx.fillStyle = project.name === "immich" ? "#080a0c" : "#f7f8fa";
        ctx.fillRect(0, 0, 960, 600);
        const scale = Math.min(960 / w, 600 / h);
        ctx.drawImage(source, (960 - w * scale) / 2, (600 - h * scale) / 2, w * scale, h * scale);
      }

      function cursor(x, y, click = false) {
        ctx.save();
        ctx.translate(x, y);
        if (click) {
          ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2);
          ctx.fillStyle = "#3984ff33"; ctx.fill();
        }
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(0, 24); ctx.lineTo(6, 18);
        ctx.lineTo(12, 29); ctx.lineTo(17, 26); ctx.lineTo(11, 16);
        ctx.lineTo(22, 16); ctx.closePath();
        ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#17212e"; ctx.lineWidth = 1.5;
        ctx.fill(); ctx.stroke(); ctx.restore();
      }

      function render(t) {
        if (project.gif) { fit(); return; }
        const progress = smooth((t - 1.8) / 2.3);
        if (project.name === "plane") {
          crop([0.022, 0.377, 0.956, 0.60]);
          if (t > 1.3 && t < 7.4) {
            const shift = 315 * progress;
            ctx.fillStyle = "#f9fafb"; ctx.fillRect(15, 73, 296, 141);
            ctx.save(); ctx.shadowColor = "#17212e35"; ctx.shadowBlur = 20;
            ctx.fillStyle = "#ffffff"; ctx.fillRect(20 + shift, 77, 290, 132);
            ctx.restore();
            ctx.drawImage(source, 0.048 * w, 0.457 * h, 0.293 * w, 0.139 * h, 20 + shift, 77, 290, 132);
            ctx.strokeStyle = "#4d8afb"; ctx.lineWidth = 2;
            ctx.strokeRect(20 + shift, 77, 290, 132);
            cursor(210 + shift, 130, progress > 0.98);
          } else cursor(210, 130);
        } else if (project.name === "immich") {
          const views = [[0, 0, 0.535, 0.53], [0.10, 0.217, 0.48, 0.43], [0.165, 0.477, 0.5, 0.514]];
          const stage = t < 2.8 ? 0 : t < 5.8 ? 1 : 2;
          crop(views[stage]);
          if (stage > 0) {
            const elapsed = stage === 1 ? t - 2.8 : t - 5.8;
            if (elapsed < 0.5) crop(views[stage - 1], 1 - smooth(elapsed / 0.5));
          }
          cursor(stage === 0 ? 180 + 120 * progress : stage === 1 ? 460 : 845, stage === 0 ? 135 : stage === 1 ? 330 : 55, t % 2.8 > 2.2);
        } else if (project.name === "firefly") {
          crop([0.108, 0.06, 0.786, 0.85]);
          const x = 220 + smooth((t - 1) / 6) * 440;
          if (t > 1) {
            ctx.strokeStyle = "#398db9"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x, 240); ctx.lineTo(x, 440); ctx.stroke();
            const amount = Math.round(7390 - Math.sin(t) * 130);
            ctx.fillStyle = "#172b3b";
            ctx.beginPath(); ctx.roundRect(x - 65, 245, 140, 65, 5); ctx.fill();
            ctx.font = "13px Arial"; ctx.fillStyle = "#b8cfde";
            ctx.fillText("Checking account", x - 53, 267);
            ctx.font = "bold 19px Arial"; ctx.fillStyle = "#ffffff";
            ctx.fillText(`EUR ${amount.toLocaleString("en-US")}`, x - 53, 292);
            cursor(x, 340);
          }
        } else {
          fit();
          const zoom = 1 + 0.09 * Math.sin(Math.PI * t / 9);
          ctx.save(); ctx.translate(480, 300); ctx.scale(zoom, zoom);
          ctx.drawImage(source, -480, -300, 960, 600); ctx.restore();
          cursor(350 + progress * 300, 370 - progress * 110, t > 4 && t < 4.6);
        }
      }

      render(0);
      const poster = canvas.toDataURL("image/png").split(",")[1];
      const stream = canvas.captureStream(24);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp8", videoBitsPerSecond: 1100000 });
      const chunks = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);
      const stopped = new Promise((resolve) => { recorder.onstop = resolve; });
      recorder.start();
      const start = performance.now();
      let frameIndex = 0;
      let gifTimestamp = 0;
      let gifCycleStart = 0;
      let nextGifTime = (source.duration || 33000) / 1000;
      while (performance.now() - start < 9000) {
        const elapsed = performance.now() - start;
        if (decoder && elapsed >= nextGifTime) {
          source.close();
          frameIndex = (frameIndex + 1) % decoder.tracks.selectedTrack.frameCount;
          if (frameIndex === 0) { gifCycleStart += gifTimestamp; gifTimestamp = 0; }
          source = (await decoder.decode({ frameIndex })).image;
          gifTimestamp += (source.duration || 33000) / 1000;
          nextGifTime = gifCycleStart + gifTimestamp;
        }
        render(elapsed / 1000);
        await new Promise(requestAnimationFrame);
      }
      recorder.stop(); await stopped;
      stream.getTracks().forEach((track) => track.stop());
      source.close(); decoder?.close();
      const videoBytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
      let binary = "";
      for (let offset = 0; offset < videoBytes.length; offset += 8192) {
        binary += String.fromCharCode(...videoBytes.subarray(offset, offset + 8192));
      }
      return { video: btoa(binary), poster };
    }, project);
    await writeFile(`public/projects/${project.name}-demo.webm`, Buffer.from(result.video, "base64"));
    await writeFile(`public/projects/${project.name}-poster.png`, Buffer.from(result.poster, "base64"));
    console.log(`${project.name}: preview ready`);
    await page.close();
  }
} finally {
  await browser.close();
}
