(function () {
  "use strict";

  /* Sticky header shadow */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Billing interval toggle — mirrors the live checkout pricing */
  var INTERVALS = {
    starter: { month: 12, year: 120 },
    pro: { month: 29, year: 290 }
  };

  var billingButtons = document.querySelectorAll(".billing-toggle [data-interval]");

  function money(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2);
  }

  function setIntervalValue(interval) {
    billingButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.interval === interval));
    });

    Object.keys(INTERVALS).forEach(function (plan) {
      var yearlyTotal = INTERVALS[plan].year;
      var perMonth = yearlyTotal / 12;

      var amountEl = document.querySelector('[data-price="' + plan + '"]');
      var periodEl = document.querySelector('[data-period="' + plan + '"]');
      var noteEl = document.querySelector('[data-note="' + plan + '"]');
      var checkout = document.querySelector('[data-checkout="' + plan + '"]');

      if (interval === "year") {
        if (amountEl) amountEl.textContent = money(perMonth);
        if (periodEl) periodEl.textContent = "per month";
        if (noteEl) noteEl.textContent = "$" + money(yearlyTotal) + " billed yearly";
      } else {
        if (amountEl) amountEl.textContent = money(INTERVALS[plan].month);
        if (periodEl) periodEl.textContent = "per month";
        if (noteEl) noteEl.textContent = "billed monthly";
      }

      if (checkout) {
        var url = new URL(checkout.getAttribute("href"));
        url.searchParams.set("interval", interval);
        checkout.setAttribute("href", url.toString());
      }
    });
  }

  billingButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setIntervalValue(btn.dataset.interval);
    });
  });

  if (billingButtons.length) setIntervalValue("month");

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  }

  /* Year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
