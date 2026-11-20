"use client";

import { useEffect, useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

export type SceneVariant = "hero" | "orb" | "knot";
export type SceneAlign = "right" | "center";

type PointerRef = MutableRefObject<{ x: number; y: number }>;

/** Window-level pointer parallax (canvas itself is pointer-events-none). */
function useWindowPointer(): PointerRef {
  const ref = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return ref;
}

/** Lerped parallax group — the whole scene drifts subtly with the cursor. */
function Rig({
  children,
  pointer,
  strength = 1,
}: {
  children: ReactNode;
  pointer: PointerRef;
  strength?: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const targetY = pointer.current.x * 0.22 * strength;
    const targetX = -pointer.current.y * 0.12 * strength;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.045);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.045);
  });
  return <group ref={group}>{children}</group>;
}

/** Liquid-mercury orb — the signature object of the 3D layer. */
function LiquidOrb({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <Float
      speed={1.6}
      rotationIntensity={0.7}
      floatIntensity={1.15}
      floatingRange={[-0.14, 0.14]}
    >
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1.32, 64, 64]} />
        <MeshDistortMaterial
          color="#d9d9de"
          metalness={1}
          roughness={0.11}
          distort={0.34}
          speed={1.7}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

/** Polished chrome torus knot. */
function ChromeKnot({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={1.35} rotationIntensity={1.15} floatIntensity={1}>
      <mesh position={position} scale={scale}>
        <torusKnotGeometry args={[0.82, 0.24, 220, 36]} />
        <meshStandardMaterial
          color="#ececf0"
          metalness={1}
          roughness={0.075}
          envMapIntensity={1.55}
        />
      </mesh>
    </Float>
  );
}

/** Small faceted chrome shard — catches light, adds sparkle depth. */
function ChromeShard({
  position,
  scale = 1,
  rotation = [0.4, 0.6, 0.2],
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  return (
    <Float speed={2.2} rotationIntensity={1.6} floatIntensity={1.35}>
      <mesh position={position} scale={scale} rotation={rotation}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#f4f4f6"
          metalness={1}
          roughness={0.05}
          flatShading
          envMapIntensity={1.7}
        />
      </mesh>
    </Float>
  );
}

/** Floating chrome "link chip" — a nod to the product itself. */
function LinkChip({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  tint = "#f2f2f5",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  tint?: string;
}) {
  return (
    <Float speed={1.25} rotationIntensity={0.85} floatIntensity={1.25}>
      <RoundedBox
        args={[1.9, 0.6, 0.16]}
        radius={0.075}
        smoothness={4}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <meshStandardMaterial
          color={tint}
          metalness={0.95}
          roughness={0.16}
          envMapIntensity={1.45}
        />
      </RoundedBox>
    </Float>
  );
}

/** Studio environment rendered locally — zero network HDR fetches. */
function StudioEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <color attach="background" args={["#050506"]} />
      <Lightformer
        intensity={4.2}
        position={[0, 5, -9]}
        scale={[11, 2.1, 1]}
        color="#ffffff"
      />
      <Lightformer
        intensity={2.6}
        position={[-5.5, 0.8, -1]}
        rotation-y={Math.PI / 2}
        scale={[9, 1.5, 1]}
        color="#f2f2f5"
      />
      <Lightformer
        intensity={2.6}
        position={[5.5, -0.8, -1]}
        rotation-y={-Math.PI / 2}
        scale={[9, 1.5, 1]}
        color="#d9d9df"
      />
      <Lightformer
        intensity={1.5}
        position={[0, -5, 2]}
        rotation-x={Math.PI / 2}
        scale={[10, 2.2, 1]}
        color="#8f8f97"
      />
    </Environment>
  );
}

function SceneContents({
  variant,
  align,
  sparkles,
}: {
  variant: SceneVariant;
  align: SceneAlign;
  sparkles: number;
}) {
  const pointer = useWindowPointer();
  const right = align === "right";

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.15} color="#ffffff" />
      <directionalLight
        position={[-6, -3, -4]}
        intensity={0.35}
        color="#9a9aa2"
      />
      <StudioEnvironment />

      <Rig pointer={pointer} strength={variant === "hero" ? 1.15 : 0.8}>
        {variant === "hero" && (
          <>
            <LiquidOrb position={[3.35, 0.75, -0.4]} scale={1.32} />
            <ChromeKnot position={[-3.55, -1.75, -2.2]} scale={0.72} />
            <ChromeShard position={[-2.15, 1.95, -1.1]} scale={0.8} />
            <ChromeShard
              position={[4.55, -2.15, -1.5]}
              scale={0.55}
              rotation={[0.9, 0.2, 0.5]}
            />
            <LinkChip
              position={[1.55, 2.2, 0.6]}
              rotation={[0, -0.35, 0.08]}
              scale={0.9}
            />
            <LinkChip
              position={[-4.35, 0.45, -0.6]}
              rotation={[0, 0.42, -0.1]}
              scale={0.75}
              tint="#17171b"
            />
            <LinkChip
              position={[2.6, -2.4, 0.4]}
              rotation={[0, -0.15, 0.05]}
              scale={0.8}
            />
          </>
        )}

        {variant === "orb" && (
          <>
            <LiquidOrb
              position={right ? [3.5, 0.4, -0.9] : [0, 0.15, -1.3]}
              scale={right ? 1.18 : 1.6}
            />
            <ChromeShard
              position={right ? [1.6, -1.9, -0.6] : [-2.6, 1.4, -1.2]}
              scale={0.5}
              rotation={[0.7, 0.3, 0.9]}
            />
          </>
        )}

        {variant === "knot" && (
          <>
            <ChromeKnot
              position={right ? [3.6, 0.35, -0.9] : [0, 0.1, -1.3]}
              scale={right ? 1.05 : 1.35}
            />
            <ChromeShard
              position={right ? [1.7, 1.9, -1.2] : [2.7, -1.7, -0.8]}
              scale={0.5}
            />
          </>
        )}
      </Rig>

      <Sparkles
        count={sparkles}
        scale={[12, 7, 5]}
        size={2.6}
        speed={0.3}
        opacity={0.55}
        noise={1.15}
        color="#ffffff"
        position={[0, 0, -0.5]}
      />
    </>
  );
}

export function SceneCanvas({
  variant,
  align = "right",
  sparkles = 46,
}: {
  variant: SceneVariant;
  align?: SceneAlign;
  sparkles?: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: variant === "hero" ? [0, 0.8, 9.4] : [0, 0.4, 8.2],
        fov: variant === "hero" ? 40 : 42,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContents variant={variant} align={align} sparkles={sparkles} />
    </Canvas>
  );
}
