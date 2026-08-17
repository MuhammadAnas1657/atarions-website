import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Shared lighting / material language for every Atarion 3D scene. One
// studio setup, one color language, reused across scenes.
export const BRAND = {
  violet: "#6E5BFF",
  cyan: "#3AD6FF",
  deep: "#06060b",
};

export function useLowPower() {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return narrow || reduced;
}

export function StudioLights({ intensity = 1 }) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} color="#8f9bff" />
      <directionalLight position={[4, 6, 5]} intensity={2.6 * intensity} color="#ffffff" />
      <directionalLight position={[-6, 2, -4]} intensity={3.4 * intensity} color={BRAND.cyan} />
      <pointLight position={[0, -3, 3]} intensity={12 * intensity} color={BRAND.violet} distance={12} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, 5, -6]} scale={[12, 6, 1]} />
        <Lightformer form="circle" intensity={3} color={BRAND.violet} position={[-6, 1, 2]} scale={[6, 6, 1]} />
        <Lightformer form="circle" intensity={2.4} color={BRAND.cyan} position={[6, -1, 2]} scale={[6, 6, 1]} />
      </Environment>
    </>
  );
}

export function BrandEffects({ bloom = 0.85 }) {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom intensity={bloom} luminanceThreshold={0.18} luminanceSmoothing={0.35} mipmapBlur />
    </EffectComposer>
  );
}

/** Tilts its children toward the pointer with heavy easing. */
export function ParallaxGroup({ children, strength = 0.22, spin = 0.08 }) {
  const group = useRef(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);
    g.rotation.y += spin * d;
    g.rotation.x += (-pointer.y * strength - g.rotation.x) * Math.min(1, d * 2.4);
    g.position.x += (pointer.x * strength * 1.6 - g.position.x) * Math.min(1, d * 2);
  });

  return <group ref={group}>{children}</group>;
}

export function SceneCanvas({ children, cameraPosition = [0, 0, 6], fov = 40, className, dpr = [1, 1.8] }) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: cameraPosition, fov }}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </Canvas>
  );
}
