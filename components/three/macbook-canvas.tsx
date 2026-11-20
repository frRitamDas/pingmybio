"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MacbookStage, type MacbookMode } from "./macbook-model";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Camera dolly + look-at, driven by the (damped) scroll progress. */
function ScrollCamera({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const camera = useThree((s) => s.camera);
  const smoothed = useRef(0);
  const target = useRef(new THREE.Vector3(0, 0.3, 0));

  useFrame((_, delta) => {
    smoothed.current = THREE.MathUtils.damp(
      smoothed.current,
      progressRef.current,
      3.2,
      delta
    );
    const e = easeInOut(smoothed.current);
    camera.position.set(
      THREE.MathUtils.lerp(-1.6, 0.34, e),
      THREE.MathUtils.lerp(1.95, 1.02, e),
      THREE.MathUtils.lerp(6.9, 4.35, e)
    );
    camera.lookAt(target.current);
  });
  return null;
}

function HeroCamera() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.set(0, 1.18, 5.45);
    camera.lookAt(0, 0.32, 0);
  }, [camera]);
  return null;
}

export function MacbookCanvas({
  mode,
  progressRef,
}: {
  mode: MacbookMode;
  progressRef?: MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: mode === "scroll" ? 33 : 36, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      {mode === "scroll" ? <ScrollCamera progressRef={progressRef!} /> : <HeroCamera />}
      <MacbookStage mode={mode} progressRef={progressRef} />
    </Canvas>
  );
}
