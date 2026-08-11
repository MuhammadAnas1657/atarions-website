import { useEffect, useRef, useState } from "react";

// Defers mounting `children` until the wrapper is about to scroll into
// view. Unlike React.lazy (which only splits the JS bundle), this also
// delays running the component's effects/animations until it's actually
// needed — a page full of `React.lazy` sections still mounts and animates
// all of them immediately on load. `rootMargin` is generous on purpose so
// the mount (and any layout it introduces) happens well before the user
// scrolls there, keeping it invisible — animations still play exactly the
// same once a section is on screen, they just don't run before that.
export default function LazyMount({ children, rootMargin = "800px 0px" }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender, rootMargin]);

  return <div ref={ref}>{shouldRender ? children : null}</div>;
}
