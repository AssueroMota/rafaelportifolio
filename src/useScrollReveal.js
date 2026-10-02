import { useLayoutEffect } from "react";

export function useScrollReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (preference.matches) {
          target.dataset.revealState = "done";
          return;
        }

        target.dataset.revealState = isIntersecting ? "entering" : "pending";
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    function register(element) {
      if (registered.has(element)) return;
      registered.add(element);
      if (preference.matches || element.contains(document.activeElement)) {
        element.dataset.revealState = "done";
      } else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    }

    function registerTree(element) {
      if (!(element instanceof Element) || !root.contains(element)) return;
      if (element.matches("[data-reveal]")) register(element);
      element.querySelectorAll("[data-reveal]").forEach(register);
    }

    // Filtered projects and company changes can introduce new elements.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(registerTree);
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element) || root.contains(node)) return;
          observer.unobserve(node);
          registered.delete(node);
          node.querySelectorAll("[data-reveal]").forEach((element) => {
            observer.unobserve(element);
            registered.delete(element);
          });
        });
      });
    });

    function finish(event) {
      if (event.animationName === "scrollReveal") {
        event.target.dataset.revealState = "done";
      }
    }

    function revealFocused(event) {
      let element = event.target.closest("[data-reveal]");
      while (element && root.contains(element)) {
        element.dataset.revealState = "done";
        element = element.parentElement?.closest("[data-reveal]");
      }
    }

    function syncPreference() {
      root.querySelectorAll("[data-reveal]").forEach((element) => {
        if (preference.matches) {
          element.dataset.revealState = "done";
        } else {
          element.dataset.revealState = "pending";
          observer.observe(element);
        }
      });
    }

    registerTree(root);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener("change", syncPreference);
    root.addEventListener("animationend", finish);
    root.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", syncPreference);
      root.removeEventListener("animationend", finish);
      root.removeEventListener("focusin", revealFocused);
      root.querySelectorAll("[data-reveal]").forEach((element) => {
        delete element.dataset.revealState;
      });
    };
  }, [rootRef]);
}
