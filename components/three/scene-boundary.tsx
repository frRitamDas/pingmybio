"use client";

import { Component, type ReactNode } from "react";

/**
 * If WebGL is unavailable or the scene throws (old GPU, disabled
 * hardware acceleration, headless prerender), swallow the error and
 * render nothing — the band already ships a dot-grid + gradient
 * backdrop, so the page stays fully intact.
 */
export class SceneBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Decorative layer — intentionally silent.
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
