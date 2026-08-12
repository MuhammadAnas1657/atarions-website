import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Target section may still be lazy-loading (React.lazy chunk / LazyMount
    // deferred mount), so it doesn't exist in the DOM yet on this commit.
    // Watch for it to appear instead of giving up and scrolling to top.
    let found = false;
    const observer = new MutationObserver(() => {
      const target = document.querySelector(hash);
      if (target) {
        found = true;
        observer.disconnect();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const timeout = setTimeout(() => {
      observer.disconnect();
      if (!found) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}
