/* ============================================================
   PAVITRA RAJPAL — portfolio behaviour
   ============================================================ */

/* ------------------------------------------------------------
   >>> EDIT YOUR CONTACT DETAILS HERE — THIS IS THE ONLY PLACE.
   Every page picks these up automatically.
------------------------------------------------------------ */
const CONTACT = {
  email:     'hello@pavitrarajpal.com',                            // TODO: your real email
  instagram: 'https://instagram.com/pavitrarajpal',                // TODO: your real handle
  tiktok:    'https://tiktok.com/@pavitrarajpal',                  // TODO: your real handle
  linkedin:  'https://www.linkedin.com/in/pavitra-rajpal-926125325'
};

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. Wire up contact links from CONTACT
  -------------------------------------------------------- */
  function applyContact() {
    document.querySelectorAll('[data-contact]').forEach(function (el) {
      var key = el.dataset.contact;
      var href, text;

      if (key === 'email') {
        href = 'mailto:' + CONTACT.email;
        text = CONTACT.email;
      } else if (CONTACT[key]) {
        href = CONTACT[key];
        text = '@' + CONTACT[key].replace(/\/$/, '').split('/').pop().replace(/^@/, '');
      } else {
        return;
      }

      if (el.tagName === 'A') el.href = href;
      if (el.dataset.contactText === 'value') el.textContent = text;
    });
  }

  /* --------------------------------------------------------
     2. Typewriter for the home tagline
  -------------------------------------------------------- */
  function typewriter() {
    var host = document.querySelector('[data-type]');
    if (!host) return;

    var full = host.dataset.type;
    var caret = document.createElement('span');
    caret.className = 'caret';
    caret.textContent = '|';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.textContent = full;
      host.appendChild(caret);
      return;
    }

    var out = document.createElement('span');
    host.textContent = '';
    host.append(out, caret);

    var i = 0;
    (function step() {
      if (i <= full.length) {
        out.textContent = full.slice(0, i++);
        setTimeout(step, 42);
      }
    })();
  }

  /* --------------------------------------------------------
     3. Drag-to-move for .pin and .float elements
        Pointer events, so mouse + touch both work.
        A drag suppresses the click so links don't fire.
  -------------------------------------------------------- */
  function draggable(el) {
    var dx = 0, dy = 0, startX = 0, startY = 0, moved = false, active = false;

    // remember any offset already applied
    var base = { x: 0, y: 0 };

    el.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      active = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', function (e) {
      if (!active) return;
      dx = e.clientX - startX;
      dy = e.clientY - startY;

      if (!moved && Math.hypot(dx, dy) > 4) {
        moved = true;
        el.classList.add('is-dragging');
      }
      if (!moved) return;

      var rot = getComputedStyle(el).getPropertyValue('--rot') || '0deg';
      el.style.transform =
        'translate(' + (base.x + dx) + 'px,' + (base.y + dy) + 'px) rotate(' + rot.trim() + ')';
    });

    function end(e) {
      if (!active) return;
      active = false;
      if (moved) {
        base.x += dx;
        base.y += dy;
        // let the click handler below see that this was a drag
        el.dataset.justDragged = '1';
        setTimeout(function () { delete el.dataset.justDragged; }, 0);
      }
      el.classList.remove('is-dragging');
      if (e && e.pointerId !== undefined && el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    }

    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);

    el.addEventListener('click', function (e) {
      if (el.dataset.justDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    el.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  function initDrag() {
    if (window.matchMedia('(max-width: 720px)').matches) return;  // no drag on small screens
    document.querySelectorAll('.pin, .float').forEach(draggable);
  }

  /* --------------------------------------------------------
     4. Reveal on scroll
  -------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var fired = false;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, n) {
        if (!entry.isIntersecting) return;
        fired = true;
        var el = entry.target;
        setTimeout(function () { el.classList.add('in'); }, n * 70);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });

    // failsafe: if the observer never reports anything, show everything
    // rather than leaving the page blank
    setTimeout(function () {
      if (fired) return;
      io.disconnect();
      items.forEach(function (el) { el.classList.add('in'); });
    }, 2500);
  }

  /* --------------------------------------------------------
     4b. Falling lily petals
         Fixed, hand-tuned lanes rather than random ones, so they
         never clump. Add an empty <div class="petals"></div> to any
         page to switch the effect on there.

         x     across the screen        size  px
         dur   seconds to fall          sway  px of drift
         op    opacity                  delay stagger, seconds
  -------------------------------------------------------- */
  var PETALS = [
    { x: '6%',  size: 13, dur: 22, sway: 34,  op: 0.50, delay: -2 },
    { x: '18%', size:  9, dur: 26, sway: -26, op: 0.38, delay: -11 },
    { x: '31%', size: 15, dur: 19, sway: 42,  op: 0.44, delay: -6 },
    { x: '44%', size: 10, dur: 24, sway: -30, op: 0.34, delay: -17 },
    { x: '57%', size: 14, dur: 21, sway: 36,  op: 0.47, delay: -9 },
    { x: '68%', size:  9, dur: 27, sway: -22, op: 0.36, delay: -3 },
    { x: '79%', size: 16, dur: 18, sway: 40,  op: 0.42, delay: -14 },
    { x: '90%', size: 11, dur: 23, sway: -34, op: 0.40, delay: -7 },
    { x: '97%', size: 12, dur: 25, sway: 28,  op: 0.33, delay: -20 }
  ];

  function initPetals() {
    var host = document.querySelector('.petals');
    if (!host) return;

    // decorative only — skip for anyone who asked for less motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // fewer on a phone, where they'd be denser and cost more to paint
    var narrow = window.matchMedia('(max-width: 720px)').matches;
    var list = narrow ? PETALS.filter(function (_, i) { return i % 2 === 0; }) : PETALS;

    var frag = document.createDocumentFragment();
    list.forEach(function (p) {
      var el = document.createElement('span');
      el.className = 'petal';
      el.style.cssText =
        '--x:' + p.x + ';' +
        '--size:' + p.size + 'px;' +
        '--dur:' + p.dur + 's;' +
        '--sway:' + p.sway + 'px;' +
        '--op:' + p.op + ';' +
        '--delay:' + p.delay + 's;' +
        '--sway-dur:' + (p.dur * 0.42).toFixed(1) + 's';
      el.appendChild(document.createElement('i'));
      frag.appendChild(el);
    });
    host.appendChild(frag);
  }

  /* --------------------------------------------------------
     5. Missing photos degrade to the paper placeholder
  -------------------------------------------------------- */
  function initImgFallback() {
    document.querySelectorAll('.slot img').forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); });
      if (img.complete && img.naturalWidth === 0) img.remove();
    });
  }

  /* --------------------------------------------------------
     6. Contact form — no backend, so hand off to the mail app
  -------------------------------------------------------- */
  function initForm() {
    var form = document.querySelector('[data-mailto-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || '').trim();
      var from = (form.elements.email.value || '').trim();
      var msg  = (form.elements.message.value || '').trim();

      var body = msg + '\n\n— ' + name + (from ? ' (' + from + ')' : '');
      window.location.href =
        'mailto:' + CONTACT.email +
        '?subject=' + encodeURIComponent('Hello from your site — ' + name) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* -------------------------------------------------------- */
  function boot() {
    applyContact();
    typewriter();
    initDrag();
    initPetals();
    initReveal();
    initImgFallback();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
