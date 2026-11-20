/* ============================================================
   PINGMYBIO — Motion Engine (vanilla, reduced-motion aware)
   ============================================================ */
(function () {
  "use strict";
  var mm = typeof window.matchMedia === "function" ? window.matchMedia.bind(window) : null;
  var prefersReduced = mm ? mm("(prefers-reduced-motion: reduce)").matches : false;
  var finePointer = mm ? mm("(pointer: fine)").matches : true;
  var hasIO = typeof window.IntersectionObserver === "function";

  /* ---------- Preloader + hero entrance ---------- */
  var countEl = document.querySelector(".preloader__count");
  function finishLoad() { document.body.classList.add("is-loaded"); }
  if (prefersReduced || !document.querySelector(".preloader")) {
    finishLoad();
  } else {
    var start = performance.now(), DUR = 950;
    function tick(now) {
      var p = Math.min(1, (now - start) / DUR);
      var eased = 1 - Math.pow(2, -8 * p);
      var val = Math.round((p === 1 ? 1 : eased) * 100);
      if (countEl) countEl.textContent = "LOADING — " + String(val).padStart(3, "0");
      if (p < 1) requestAnimationFrame(tick); else finishLoad();
    }
    requestAnimationFrame(tick);
    setTimeout(finishLoad, 2600); // safety net
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Scroll progress + nav state ---------- */
  var progress = document.querySelector(".scroll-progress span");
  var nav = document.querySelector(".nav");
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? doc.scrollTop / max : 0) + ")";
    if (nav) nav.classList.toggle("is-scrolled", doc.scrollTop > 32);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(".reveal, .footer__giant");
  if (hasIO && !prefersReduced) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Animated counters ---------- */
  function paintCounter(el, value) {
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    el.textContent = (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
  }
  var counterEls = document.querySelectorAll("[data-count]");
  if (hasIO && !prefersReduced) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        counterIO.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count") || "0");
        var t0 = performance.now(), D = 1900;
        function frame(t) {
          var p = Math.min(1, (t - t0) / D);
          var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          paintCounter(el, target * e);
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.6 });
    counterEls.forEach(function (el) { counterIO.observe(el); });
  } else {
    counterEls.forEach(function (el) { paintCounter(el, parseFloat(el.getAttribute("data-count") || "0")); });
  }

  /* ---------- Hero phone: self-playing assistant chat ---------- */
  var chat = document.querySelector(".phone__chat");
  if (chat) {
    var fan = chat.querySelector(".bubble--fan");
    var typing = chat.querySelector(".typing");
    var ai = chat.querySelector(".bubble--ai");
    var offer = chat.querySelector(".bubble--offer");
    var seq = [fan, ai, offer];
    function resetChat() {
      seq.forEach(function (b) { b && b.classList.remove("is-in"); });
      if (typing) typing.classList.remove("is-in");
    }
    function playChat() {
      resetChat();
      var t = 650;
      setTimeout(function () { fan && fan.classList.add("is-in"); }, t);
      setTimeout(function () { typing && typing.classList.add("is-in"); }, t + 750);
      setTimeout(function () { typing && typing.classList.remove("is-in"); ai && ai.classList.add("is-in"); }, t + 2100);
      setTimeout(function () { offer && offer.classList.add("is-in"); }, t + 2900);
    }
    if (prefersReduced) {
      seq.forEach(function (b) { b && b.classList.add("is-in"); });
    } else if (hasIO) {
      var chatIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playChat();
            chatIO.disconnect();
            setInterval(playChat, 9000);
          }
        });
      }, { threshold: 0.35 });
      chatIO.observe(chat);
    } else {
      playChat();
    }
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-magnetic") || "0.35");
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * strength;
        var y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
        setTimeout(function () { el.style.transition = ""; }, 620);
      });
    });
  }

  /* ---------- Custom cursor (dot + lerped ring) ---------- */
  var cdot = document.querySelector(".cursor-dot");
  var cring = document.querySelector(".cursor-ring");
  if (cdot && cring && finePointer && !prefersReduced && typeof requestAnimationFrame === "function") {
    var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      cdot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    }, { passive: true });
    (function lerp() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      cring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(lerp);
    })();
    var hoverSel = "a, button, .faq-q, input, .switch, [data-cursor]";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.add("cursor-hot");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.remove("cursor-hot");
    });
  } else if (cdot && cring) {
    cdot.style.display = "none"; cring.style.display = "none";
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      document.body.style.overflow = document.body.classList.contains("menu-open") ? "hidden" : "";
      burger.setAttribute("aria-expanded", document.body.classList.contains("menu-open") ? "true" : "false");
    });
    document.querySelectorAll(".mmenu a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { document.body.classList.remove("menu-open"); document.body.style.overflow = ""; }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- Pricing billing toggle ---------- */
  var billSwitch = document.getElementById("billingSwitch");
  if (billSwitch) {
    var amounts = document.querySelectorAll("[data-monthly]");
    var optMonthly = document.querySelector("[data-opt='monthly']");
    var optYearly = document.querySelector("[data-opt='yearly']");
    function renderBilling(yearly) {
      billSwitch.setAttribute("aria-checked", yearly ? "true" : "false");
      if (optMonthly) optMonthly.classList.toggle("is-on", !yearly);
      if (optYearly) optYearly.classList.toggle("is-on", yearly);
      amounts.forEach(function (el) {
        el.style.opacity = "0"; el.style.transform = "translateY(10px)";
        setTimeout(function () {
          el.textContent = yearly ? el.getAttribute("data-yearly") : el.getAttribute("data-monthly");
          el.style.opacity = "1"; el.style.transform = "none";
        }, 140);
      });
    }
    billSwitch.addEventListener("click", function () {
      renderBilling(billSwitch.getAttribute("aria-checked") !== "true");
    });
  }

  /* ---------- Newsletter capture ---------- */
  document.querySelectorAll(".newsletter").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type='email']");
      var holder = form.parentElement;
      var note = holder ? holder.querySelector(".newsletter-note") : null;
      var done = holder ? holder.querySelector(".newsletter-done") : null;
      var val = (input && input.value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(val)) {
        if (note) { note.textContent = "Enter a valid email address"; note.style.color = "#ffb4b4"; }
        return;
      }
      form.style.display = "none";
      if (note) note.style.display = "none";
      if (done) done.style.display = "block";
    });
  });

  /* ---------- App preview: setup progress ring ---------- */
  var ring = document.querySelector(".ring-value");
  if (ring) {
    var doneCount = parseInt(ring.getAttribute("data-progress") || "1", 10);
    var total = parseInt(ring.getAttribute("data-total") || "4", 10);
    var C = 251.2; // 2 * PI * 40
    var target = C * (1 - doneCount / total);
    var show = function () { ring.style.strokeDashoffset = String(target); };
    if (hasIO) {
      var ringIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { setTimeout(show, 250); ringIO.disconnect(); }
        });
      }, { threshold: 0.4 });
      ringIO.observe(ring);
    } else {
      show();
    }
  }
})();
