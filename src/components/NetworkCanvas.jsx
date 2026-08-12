import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

// Signature visual: a drifting node network that brightens near the
// pointer and shifts subtly with scroll — "connection" + "intelligence".
export default function NetworkCanvas({ className = "", density = 0.00009, interactive = true }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, nodes, raf;
    const pointer = { x: -9999, y: -9999 };
    let scrollShift = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.floor(width * height * density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onScroll() {
      scrollShift = window.scrollY * 0.02;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(width, height) * 0.14;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy + Math.sin(scrollShift * 0.05) * 0.001;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const pd = Math.hypot(midX - pointer.x, midY - pointer.y);
            const proximity = Math.max(0, 1 - pd / 180);
            const baseAlpha = (1 - dist / linkDist) * 0.14;
            const alpha = Math.min(0.55, baseAlpha + proximity * 0.35);
            ctx.strokeStyle = proximity > 0.15
              ? `rgba(0, 229, 199, ${alpha})`
              : `rgba(108, 79, 240, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const proximity = Math.max(0, 1 - pd / 160);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + proximity * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0.1
          ? `rgba(0, 229, 199, ${0.5 + proximity * 0.5})`
          : "rgba(180, 170, 240, 0.45)";
        ctx.fill();
      }

      raf = isVisible && isTabVisible ? requestAnimationFrame(draw) : null;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (interactive) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    // Pause the draw loop entirely while the canvas is scrolled off-screen —
    // this runs on both Hero and Footer, so an always-on rAF loop means two
    // particle simulations burning CPU for the whole session even unseen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabVisible && !reduced && !raf) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function onVisibilityChange() {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible && !reduced && !raf) {
        raf = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!reduced) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (interactive) {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [reduced, density, interactive]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
