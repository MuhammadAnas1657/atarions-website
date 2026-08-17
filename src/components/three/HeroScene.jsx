import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  MessageCircle,
  Network,
  Server,
  Settings,
  Shield,
  Smartphone,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";
import { BRAND, BrandEffects, ParallaxGroup, SceneCanvas, StudioLights, useLowPower } from "./stage";

const TECH_ICONS = [
  Cpu,
  Cloud,
  Wifi,
  Settings,
  MessageCircle,
  BarChart3,
  Smartphone,
  Globe,
  Database,
  Code2,
  Server,
  Shield,
  Zap,
  Layers,
  Terminal,
  Boxes,
  Network,
  Lock,
];

function Core({ low, shellRef }) {
  const inner = useRef(null);
  const shell = shellRef;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (inner.current) {
      const s = 1 + Math.sin(t * 0.9) * 0.035;
      inner.current.scale.setScalar(s);
      inner.current.rotation.y = t * 0.25;
    }
    if (shell.current) {
      shell.current.rotation.x = t * 0.06;
      shell.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group>
      {/* glass crystalline shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.62, low ? 0 : 1]} />
        {low ? (
          <meshPhysicalMaterial
            color="#101430"
            roughness={0.12}
            metalness={0.35}
            transparent
            opacity={0.7}
            envMapIntensity={2}
          />
        ) : (
          <MeshTransmissionMaterial
            samples={8}
            resolution={512}
            thickness={0.7}
            ior={1.4}
            chromaticAberration={0.35}
            anisotropy={0.25}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.08}
            roughness={0.06}
            envMapIntensity={0.5}
            color="#fbfaff"
            attenuationColor="#a855f7"
            attenuationDistance={2.4}
          />
        )}
      </mesh>

      {/* accent wireframe layer over the glass */}
      <mesh scale={1.06}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#d946ef" wireframe transparent opacity={0.14} />
      </mesh>

      {/* glowing inner core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.62, 2]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#a855f7" distance={6} />

      {/* brand logo embedded in the glass core */}
      <Html center distanceFactor={9} zIndexRange={[999, 0]} style={{ pointerEvents: "none" }}>
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#0A0A12]/70 ring-2 ring-white/40 shadow-[0_0_40px_10px_rgba(168,85,247,0.75)] backdrop-blur-sm">
          <img
            src="/favicon-192.png"
            alt="Atarion"
            className="w-16 h-16 object-contain"
          />
        </div>
      </Html>
    </group>
  );
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function OrbitNodes({ iconCount = 11, radius = 2.7, occludeRefs }) {
  const group = useRef(null);

  // Tech-icon badges spread evenly over the sphere's surface (Fibonacci
  // sphere distribution) so they never bunch up or overlap each other,
  // regardless of count.
  const iconNodes = useMemo(
    () =>
      Array.from({ length: iconCount }, (_, i) => {
        const y = 1 - (i / (iconCount - 1)) * 2;
        const ringR = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = GOLDEN_ANGLE * i;
        const r = radius * 1.18;
        const Icon = TECH_ICONS[i % TECH_ICONS.length];
        return {
          pos: [Math.cos(theta) * ringR * r, y * r * 0.75, Math.sin(theta) * ringR * r],
          Icon,
          isLogo: Icon === Globe,
        };
      }),
    [iconCount, radius]
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.12]}>
      {iconNodes.map(({ pos, Icon, isLogo }, i) => (
        <Html key={i} position={pos} center occlude={occludeRefs} distanceFactor={9} style={{ pointerEvents: "none" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.65)] ring-1 ring-white/40 overflow-hidden"
          >
            {isLogo ? (
              <img src="/favicon-192.png" alt="Atarion" className="w-5 h-5 object-contain" />
            ) : (
              <Icon size={15} strokeWidth={2.1} color="#241852" />
            )}
          </motion.div>
        </Html>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 128]} />
        <meshBasicMaterial color={BRAND.cyan} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const low = useLowPower();
  const shellRef = useRef(null);

  return (
    <SceneCanvas cameraPosition={[0, 0.4, 13]} fov={38} dpr={low ? [1, 1.2] : [1, 1.9]}>
      <StudioLights />
      <ParallaxGroup strength={0.3} spin={0.07}>
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
          <Core low={low} shellRef={shellRef} />
        </Float>
        <OrbitNodes iconCount={low ? 6 : 11} occludeRefs={low ? false : [shellRef]} />
      </ParallaxGroup>
      {!low && <BrandEffects bloom={0.6} />}
    </SceneCanvas>
  );
}
