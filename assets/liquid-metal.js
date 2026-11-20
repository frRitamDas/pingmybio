/* ============================================================
   PINGMYBIO — Liquid Metal Button engine (vanilla, no deps)
   WebGL2 port of the 21st.dev liquid-metal-button, driven by the
   vendored Paper Shaders liquid-metal fragment shader
   (Apache-2.0, assets/vendor/liquid-metal-fragment.js).
   Falls back to a static CSS metallic ring when WebGL2 is missing.
   Honors prefers-reduced-motion (renders one static frame).
   ============================================================ */
(function () {
  "use strict";

  var mm = typeof window.matchMedia === "function" ? window.matchMedia.bind(window) : null;
  var prefersReduced = mm ? mm("(prefers-reduced-motion: reduce)").matches : false;
  var debug = false;

  /* ---------- Mini WebGL2 pupil for the liquid metal disc ---------- */
  var VERTEX = [
    "#version 300 es",
    "precision mediump float;",
    "layout(location = 0) in vec2 a_position;",
    "uniform vec2 u_resolution;",
    "uniform float u_pixelRatio;",
    "uniform float u_scale;",
    "uniform float u_rotation;",
    "uniform float u_offsetX;",
    "uniform float u_offsetY;",
    "uniform float u_imageAspectRatio;",
    "out vec2 v_objectUV;",
    "out vec2 v_responsiveUV;",
    "out vec2 v_responsiveBoxGivenSize;",
    "out vec2 v_imageUV;",
    "void main() {",
    "  gl_Position = vec4(a_position, 0.0, 1.0);",
    "  vec2 uv = a_position * 0.5;",
    "  float r = u_rotation * 3.14159265358979 / 180.0;",
    "  mat2 rot = mat2(cos(r), sin(r), -sin(r), cos(r));",
    "  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);",
    "  float ratio = u_resolution.x / max(u_resolution.y, 1.0);",
    "  v_responsiveBoxGivenSize = u_resolution;",
    "  v_objectUV = rot * ((uv + graphicOffset) / u_scale);",
    "  v_responsiveUV = uv + graphicOffset;",
    "  v_responsiveUV /= u_scale;",
    "  v_responsiveUV.x *= ratio;",
    "  v_responsiveUV = rot * v_responsiveUV;",
    "  v_responsiveUV.x /= ratio;",
    "  v_imageUV = rot * ((uv + graphicOffset) / u_scale);",
    "  v_imageUV.x *= u_imageAspectRatio;",
    "  v_imageUV.x /= u_imageAspectRatio;",
    "  v_imageUV += 0.5;",
    "  v_imageUV.y = 1.0 - v_imageUV.y;",
    "}"
  ].join("\n");

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("LiquidMetal shader compile failed: " + info);
    }
    return shader;
  }

  function LiquidMetalPupil(container) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    var gl = canvas.getContext("webgl2", { antialias: false, depth: false, stencil: false, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl) throw new Error("WebGL2 unavailable");

    var fragSource = window.PMG_LIQUID_METAL_FRAGMENT;
    if (!fragSource) throw new Error("Liquid metal fragment shader not loaded");

    var program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("LiquidMetal link failed: " + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    function loc(name) { return gl.getUniformLocation(program, name); }
    var u = {
      resolution: loc("u_resolution"),
      pixelRatio: loc("u_pixelRatio"),
      time: loc("u_time"),
      scale: loc("u_scale"),
      rotation: loc("u_rotation"),
      offsetX: loc("u_offsetX"),
      offsetY: loc("u_offsetY"),
      imageAspectRatio: loc("u_imageAspectRatio"),
      repetition: loc("u_repetition"),
      softness: loc("u_softness"),
      shiftRed: loc("u_shiftRed"),
      shiftBlue: loc("u_shiftBlue"),
      distortion: loc("u_distortion"),
      contour: loc("u_contour"),
      angle: loc("u_angle"),
      shape: loc("u_shape"),
      isImage: loc("u_isImage"),
      colorBack: loc("u_colorBack"),
      colorTint: loc("u_colorTint")
    };

    var hasTexture = false;
    try {
      // The fragment shader calls textureGrad() unconditionally; bind a 1-px texture.
      var texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
      var sampler = gl.getUniformLocation(program, "u_image");
      if (sampler) { gl.uniform1i(sampler, 0); hasTexture = true; }
    } catch (e) { if (debug) console.warn("LiquidMetal texture bind failed", e); }

    gl.uniform1f(u.scale, 8);
    gl.uniform1f(u.rotation, 0);
    gl.uniform1f(u.offsetX, 0.1);
    gl.uniform1f(u.offsetY, -0.1);
    gl.uniform1f(u.imageAspectRatio, 1);
    gl.uniform1f(u.repetition, 4);
    gl.uniform1f(u.softness, 0.5);
    gl.uniform1f(u.shiftRed, 0.3);
    gl.uniform1f(u.shiftBlue, 0.3);
    gl.uniform1f(u.distortion, 0);
    gl.uniform1f(u.contour, 0);
    gl.uniform1f(u.angle, 45);
    gl.uniform1f(u.shape, 1);
    gl.uniform1i(u.isImage, 0);
    if (u.colorBack) gl.uniform4f(u.colorBack, 0, 0, 0, 1);
    if (u.colorTint) gl.uniform4f(u.colorTint, 0, 0, 0, 0);

    var frame = 0;
    var last = 0;
    var speed = prefersReduced ? 0 : 0.6;
    var raf = null;
    var inView = true;
    var disposed = false;

    function resize() {
      var rect = container.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(rect.width * dpr));
      var h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.resolution, canvas.width, canvas.height);
      gl.uniform1f(u.pixelRatio, dpr);
    }

    function render(now) {
      if (disposed) return;
      raf = null;
      if (document.hidden || !inView) return;
      if (!last) last = now;
      var dt = Math.min(64, now - last);
      last = now;
      if (speed !== 0) frame += dt * speed;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, frame * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (speed !== 0) raf = requestAnimationFrame(render);
    }

    function kick() {
      if (raf === null && !disposed && !document.hidden && inView) {
        last = 0;
        raf = requestAnimationFrame(render);
      } else if (speed === 0) {
        resize();
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(u.time, frame * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }

    if (typeof ResizeObserver === "function") {
      var ro = new ResizeObserver(function () { kick(); });
      ro.observe(container);
    }
    if (typeof IntersectionObserver === "function") {
      var io = new IntersectionObserver(function (entries) {
        inView = !entries[0] || entries[0].isIntersecting !== false;
        if (inView) kick();
      }, { rootMargin: "80px" });
      io.observe(container);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) kick(); });

    kick(); // first paint (and static frame under reduced motion)

    return {
      setSpeed: function (s) {
        speed = prefersReduced ? 0 : s;
        kick();
      },
      refresh: kick,
      destroy: function () {
        disposed = true;
        if (raf !== null) cancelAnimationFrame(raf);
        try { gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").loseContext(); } catch (e) {}
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  /* ---------- Behavior: hover speed, press, click ripple burst ---------- */
  function mountLiquidMetalButton(root) {
    if (root.getAttribute("data-lm-ready") === "1") return;
    root.setAttribute("data-lm-ready", "1");
    var shaderHost = root.querySelector(".lm-btn__shader");
    if (!shaderHost) return;

    var pupil = null;
    try {
      pupil = LiquidMetalPupil(shaderHost);
      root.classList.add("lm-btn--live");
    } catch (err) {
      if (debug) console.warn("LiquidMetal: falling back to static ring", err);
      root.classList.add("lm-btn--static"); // CSS static metallic ring stays visible
      return;
    }

    var hoverTimer = null;
    function applySpeed(s) { if (pupil) pupil.setSpeed(s); }

    root.addEventListener("pointerenter", function () {
      if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
      applySpeed(1);
      root.classList.add("is-hovered");
    });
    root.addEventListener("pointerleave", function () {
      applySpeed(0.6);
      root.classList.remove("is-hovered");
      root.classList.remove("is-pressed");
    });
    root.addEventListener("pointerdown", function () { root.classList.add("is-pressed"); });
    ["pointerup", "pointercancel"].forEach(function (evt) {
      root.addEventListener(evt, function () { root.classList.remove("is-pressed"); });
    });

    root.addEventListener("click", function (event) {
      // brief 2.4x speed burst, then settle back to hover/idle speed
      applySpeed(2.4);
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () {
        applySpeed(root.classList.contains("is-hovered") ? 1 : 0.6);
      }, 300);

      if (prefersReduced) return;
      var rect = root.getBoundingClientRect();
      var x = (typeof event.clientX === "number" ? event.clientX : rect.left + rect.width / 2) - rect.left;
      var y = (typeof event.clientY === "number" ? event.clientY : rect.top + rect.height / 2) - rect.top;
      var ripple = document.createElement("span");
      ripple.className = "lm-btn__ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      root.appendChild(ripple);
      setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 650);
    });
  }

  function boot() {
    document.querySelectorAll("[data-liquid-metal]").forEach(mountLiquidMetalButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
