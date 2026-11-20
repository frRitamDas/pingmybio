"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

export type MacbookMode = "hero" | "scroll";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ── Canvas textures (drawn at runtime — zero external assets) ── */

function rr(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rad = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
}

function makeScreenTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const g = c.getContext("2d")!;
  const W = 1024;
  const H = 640;
  const SANS = "'Inter Variable', Inter, system-ui, sans-serif";
  const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

  // desktop wallpaper — deep black with a soft studio glow
  g.fillStyle = "#050507";
  g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(720, 60, 40, 720, 60, 700);
  glow.addColorStop(0, "rgba(255,255,255,0.14)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, W, H);

  // app window
  const wx = 44, wy = 46, ww = W - 88, wh = H - 92;
  rr(g, wx, wy, ww, wh, 26);
  g.fillStyle = "#0c0c0f";
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.09)";
  g.lineWidth = 1.5;
  g.stroke();
  g.save();
  rr(g, wx, wy, ww, wh, 26);
  g.clip();

  // title bar
  g.fillStyle = "#131318";
  g.fillRect(wx, wy, ww, 56);
  const dots: [number, string][] = [
    [wx + 28, "rgba(255,255,255,0.22)"],
    [wx + 52, "rgba(255,255,255,0.32)"],
    [wx + 76, "rgba(255,255,255,0.45)"],
  ];
  for (const [dx, fill] of dots) {
    g.beginPath();
    g.arc(dx, wy + 28, 7, 0, Math.PI * 2);
    g.fillStyle = fill;
    g.fill();
  }
  g.fillStyle = "rgba(245,245,247,0.5)";
  g.font = `500 15px ${MONO}`;
  g.textAlign = "center";
  g.fillText("pingmybio.com/maya — Studio", wx + ww / 2, wy + 34);
  g.textAlign = "left";

  // sidebar
  const sbx = wx, sby = wy + 56, sbw = 208, sbh = wh - 56;
  g.fillStyle = "#0a0a0d";
  g.fillRect(sbx, sby, sbw, sbh);
  // ping mark + wordmark
  g.strokeStyle = "#f5f5f7";
  g.lineWidth = 2.4;
  g.beginPath();
  g.arc(sbx + 28, sby + 40, 8.5, Math.PI * 1.15, Math.PI * 1.85);
  g.stroke();
  g.beginPath();
  g.arc(sbx + 28, sby + 40, 15, Math.PI * 1.15, Math.PI * 1.85);
  g.globalAlpha = 0.55;
  g.stroke();
  g.globalAlpha = 1;
  g.beginPath();
  g.arc(sbx + 28, sby + 46, 2.6, 0, Math.PI * 2);
  g.fillStyle = "#f5f5f7";
  g.fill();
  g.fillStyle = "rgba(245,245,247,0.75)";
  g.font = `600 13px ${MONO}`;
  g.fillText("PINGMYBIO", sbx + 48, sby + 44);

  const nav: [string, boolean][] = [
    ["Profile", true],
    ["Assistant", false],
    ["Offers", false],
    ["Activity", false],
    ["Inbox", false],
    ["Collabs", false],
    ["Fans", false],
    ["Analytics", false],
    ["Settings", false],
  ];
  nav.forEach(([label, active], i) => {
    const ny = sby + 78 + i * 42;
    if (active) {
      rr(g, sbx + 14, ny - 20, sbw - 28, 32, 9);
      g.fillStyle = "rgba(255,255,255,0.1)";
      g.fill();
    }
    g.fillStyle = active ? "#f5f5f7" : "rgba(245,245,247,0.4)";
    g.font = `${active ? 600 : 500} 14.5px ${SANS}`;
    g.fillText(label, sbx + 26, ny + 2);
  });

  // main panel
  const mx = sbx + sbw + 34;
  g.fillStyle = "rgba(245,245,247,0.36)";
  g.font = `500 11px ${MONO}`;
  g.fillText("P I N G M Y B I O   /   P R O F I L E", mx, sby + 44);
  g.fillStyle = "#f5f5f7";
  g.font = `650 37px ${SANS}`;
  g.fillText("Get your page live.", mx, sby + 88);

  // setup card
  const cx = mx, cy = sby + 116, cw = wx + ww - mx - 30, ch = 224;
  rr(g, cx, cy, cw, ch, 20);
  g.fillStyle = "#14141a";
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.07)";
  g.lineWidth = 1.2;
  g.stroke();
  g.fillStyle = "rgba(245,245,247,0.35)";
  g.font = `500 10.5px ${MONO}`;
  g.fillText("S E T U P   —   1   O F   4", cx + 30, cy + 40);
  g.fillStyle = "#f5f5f7";
  g.font = `620 23px ${SANS}`;
  g.fillText("Your page is almost ready.", cx + 30, cy + 74);
  g.fillStyle = "rgba(245,245,247,0.52)";
  g.font = `400 14px ${SANS}`;
  g.fillText("Finish the steps — the assistant gets smarter", cx + 30, cy + 100);
  g.fillText("with every one.", cx + 30, cy + 121);

  const rows: [string, boolean][] = [
    ["Name your page", true],
    ["Write a short bio", false],
    ["Add an offer — your thing", false],
  ];
  rows.forEach(([label, done], i) => {
    const ry = cy + 148 + i * 34;
    g.beginPath();
    g.arc(cx + 38, ry - 5, 9, 0, Math.PI * 2);
    if (done) {
      g.fillStyle = "#f5f5f7";
      g.fill();
      g.strokeStyle = "#0c0c0f";
      g.lineWidth = 2.2;
      g.beginPath();
      g.moveTo(cx + 34, ry - 5);
      g.lineTo(cx + 37.4, ry - 1.6);
      g.lineTo(cx + 43, ry - 9.6);
      g.stroke();
    } else {
      g.strokeStyle = "rgba(245,245,247,0.38)";
      g.lineWidth = 1.6;
      g.stroke();
    }
    g.fillStyle = done ? "rgba(245,245,247,0.38)" : "rgba(245,245,247,0.82)";
    g.font = `500 14.5px ${SANS}`;
    g.fillText(label, cx + 58, ry);
    if (done) {
      const tw = g.measureText(label).width;
      g.strokeStyle = "rgba(245,245,247,0.38)";
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(cx + 58, ry - 5);
      g.lineTo(cx + 58 + tw, ry - 5);
      g.stroke();
    }
  });

  // progress ring — 1 of 4
  const rcx = cx + cw - 78, rcy = cy + ch / 2 + 6;
  g.beginPath();
  g.arc(rcx, rcy, 46, 0, Math.PI * 2);
  g.strokeStyle = "rgba(255,255,255,0.1)";
  g.lineWidth = 11;
  g.stroke();
  g.beginPath();
  g.arc(rcx, rcy, 46, -Math.PI / 2, -Math.PI / 2 + Math.PI / 2);
  g.strokeStyle = "#f5f5f7";
  g.stroke();
  g.fillStyle = "#f5f5f7";
  g.font = `650 27px ${SANS}`;
  g.textAlign = "center";
  g.fillText("1/4", rcx, rcy + 1);
  g.fillStyle = "rgba(245,245,247,0.4)";
  g.font = `500 9px ${MONO}`;
  g.fillText("D O N E", rcx, rcy + 20);
  g.textAlign = "left";

  // live URL pill
  const pw = 252;
  rr(g, W / 2 - pw / 2, H - 34, pw, 30, 15);
  g.fillStyle = "rgba(9,9,11,0.88)";
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.16)";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = "rgba(245,245,247,0.78)";
  g.font = `500 13.5px ${MONO}`;
  g.textAlign = "center";
  g.fillText("pingmybio.com/maya", W / 2, H - 14);
  g.textAlign = "left";

  g.restore(); // unclip window
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeDeckTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0a0a0c";
  g.fillRect(0, 0, 1024, 640);

  const key = (x: number, y: number, w: number, h: number) => {
    rr(g, x, y, w, h, 7);
    g.fillStyle = "#191920";
    g.fill();
    g.strokeStyle = "rgba(255,255,255,0.05)";
    g.lineWidth = 1;
    g.stroke();
  };

  // function row
  const fCols = 13, fx0 = 40, fg = 10, fw = (1024 - 80 - fg * (fCols - 1)) / fCols;
  for (let i = 0; i < fCols; i++) key(fx0 + i * (fw + fg), 22, fw, 42);

  // main rows
  const rows = 5, mCols = 14, my0 = 82, mg = 9;
  const mw = (1024 - 80 - mg * (mCols - 1)) / mCols;
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i < mCols; i++) key(40 + i * (mw + mg), my0 + r * 66, mw, 56);
  }

  // spacebar row
  const sy = my0 + rows * 66 + 6;
  key(40, sy, 110, 56);
  key(40 + 110 + 12, sy, 110, 56);
  key(40 + 220 + 24, sy, 1024 - 80 - 440 - 48, 56); // spacebar
  key(1024 - 40 - 110, sy, 110, 56);
  key(1024 - 40 - 220, sy, 100, 56);

  // trackpad
  rr(g, 1024 / 2 - 175, 470, 350, 150, 12);
  g.fillStyle = "#121218";
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.08)";
  g.lineWidth = 1.4;
  g.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/* ── Studio environment (local, no network) ── */

function StudioEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <color attach="background" args={["#050506"]} />
      <Lightformer
        intensity={4.6}
        position={[0, 5, -9]}
        scale={[12, 2.2, 1]}
        color="#ffffff"
      />
      <Lightformer
        intensity={2.8}
        position={[-5.5, 1, -1]}
        rotation-y={Math.PI / 2}
        scale={[9, 1.6, 1]}
        color="#f2f2f5"
      />
      <Lightformer
        intensity={2.8}
        position={[5.5, -0.5, -1]}
        rotation-y={-Math.PI / 2}
        scale={[9, 1.6, 1]}
        color="#dcdee4"
      />
      <Lightformer
        intensity={1.6}
        position={[0, -5, 2]}
        rotation-x={Math.PI / 2}
        scale={[10, 2.2, 1]}
        color="#8f8f97"
      />
    </Environment>
  );
}

/* ── The MacBook ── */

export function Macbook({
  mode,
  progressRef,
}: {
  mode: MacbookMode;
  progressRef?: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const smoothed = useRef(mode === "scroll" ? 0 : 1);

  const screenTex = useMemo(makeScreenTexture, []);
  const deckTex = useMemo(makeDeckTexture, []);

  useFrame((state, delta) => {
    const g = root.current;
    const l = lid.current;
    if (!g || !l) return;

    if (mode === "scroll") {
      smoothed.current = THREE.MathUtils.damp(
        smoothed.current,
        progressRef?.current ?? 0,
        3.4,
        delta
      );
    } else {
      smoothed.current = 1;
    }
    const p = smoothed.current;
    const e = easeInOut(p);

    // Lid opens early in the scroll journey
    const lidTarget =
      mode === "scroll"
        ? THREE.MathUtils.lerp(1.58, -0.17, easeInOut((p - 0.05) / 0.55))
        : -0.17;
    l.rotation.x = THREE.MathUtils.damp(l.rotation.x, lidTarget, 6, delta);

    // Screen lights up as the lid completes its travel
    const glow =
      mode === "scroll" ? smoothstep(0.3, 0.72, p) : 1;
    if (screenMat.current) {
      screenMat.current.opacity = 0.06 + glow * 0.94;
    }
    if (ringMat.current) {
      ringMat.current.opacity = 0.55 + glow * 0.45;
    }

    // Stage rotation: closed profile → open three-quarter beauty shot
    const rotTarget =
      mode === "scroll"
        ? THREE.MathUtils.lerp(0.62, -0.26, e)
        : -0.28 + state.pointer.x * 0.16;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, rotTarget, 4.2, delta);
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      mode === "scroll" ? 0 : -0.02 + state.pointer.y * 0.05,
      4.2,
      delta
    );
  });

  const aluminum = (
    <meshStandardMaterial
      color="#d7d7dc"
      metalness={0.92}
      roughness={0.3}
      envMapIntensity={1.35}
    />
  );

  return (
    <group ref={root} position={[0, mode === "scroll" ? -0.35 : -0.5, 0]}>
      {/* ── Base (aluminum unibody) ── */}
      <RoundedBox args={[3.1, 0.17, 2.05]} radius={0.055} smoothness={4}>
        {aluminum}
      </RoundedBox>

      {/* keyboard deck */}
      <mesh position={[0, 0.088, 0.08]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.9, 1.78]} />
        <meshStandardMaterial
          map={deckTex}
          roughness={0.82}
          metalness={0.2}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* front lip highlight */}
      <mesh position={[0, 0.045, 1.03]}>
        <boxGeometry args={[2.2, 0.022, 0.012]} />
        <meshStandardMaterial
          color="#efefef"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* hinge */}
      <mesh position={[0, 0.1, -0.985]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.062, 0.062, 2.82, 24]} />
        <meshStandardMaterial
          color="#17171b"
          metalness={0.65}
          roughness={0.42}
        />
      </mesh>

      {/* ── Lid (hinged at back edge) ── */}
      <group ref={lid} position={[0, 0.115, -1.0]} rotation-x={mode === "scroll" ? 1.58 : -0.17}>
        {/* shell */}
        <RoundedBox args={[3.1, 2.04, 0.1]} radius={0.05} smoothness={4} position={[0, 1.02, 0]}>
          {aluminum}
        </RoundedBox>

        {/* bezel */}
        <mesh position={[0, 1.02, 0.052]}>
          <planeGeometry args={[2.96, 1.9]} />
          <meshStandardMaterial color="#040405" roughness={0.34} metalness={0.15} />
        </mesh>

        {/* the living screen */}
        <mesh position={[0, 1.02, 0.058]}>
          <planeGeometry args={[2.8, 1.75]} />
          <meshBasicMaterial
            ref={screenMat}
            map={screenTex}
            transparent
            opacity={mode === "scroll" ? 0.06 : 1}
            toneMapped={false}
          />
        </mesh>

        {/* camera dot */}
        <mesh position={[0, 1.9, 0.056]}>
          <circleGeometry args={[0.017, 20]} />
          <meshStandardMaterial color="#14141a" roughness={0.3} />
        </mesh>

        {/* glowing ping-arc logo on the lid back */}
        <group position={[0, 1.02, -0.052]} rotation-y={Math.PI}>
          <mesh>
            <circleGeometry args={[0.045, 24]} />
            <meshBasicMaterial ref={ringMat} color="#f5f5f7" toneMapped={false} transparent opacity={0.9} />
          </mesh>
          {[0.24, 0.34, 0.44].map((r, i) => (
            <mesh key={r} position={[0, -0.1, 0]}>
              <ringGeometry args={[r - 0.026, r, 48, 1, Math.PI / 4.4, Math.PI / 1.9]} />
              <meshBasicMaterial
                color="#f5f5f7"
                toneMapped={false}
                transparent
                opacity={0.9 - i * 0.34}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export function MacbookStage({
  mode,
  progressRef,
  children,
}: {
  mode: MacbookMode;
  progressRef?: MutableRefObject<number>;
  children?: React.ReactNode;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, -2, -4]} intensity={0.4} color="#8f8f97" />
      <StudioEnvironment />
      {mode === "hero" ? (
        <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.65} floatingRange={[-0.08, 0.08]}>
          <Macbook mode="hero" />
        </Float>
      ) : (
        <Macbook mode="scroll" progressRef={progressRef} />
      )}
      {children}
    </>
  );
}
