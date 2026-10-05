/* Nonprofit & Residential Care landing: hero load + scroll reveals.
   Scoped, idempotent, no globals. Motion is skipped for reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(scope) {
    var root = (scope || document).querySelector('.sklp');
    if (!root || root.dataset.sklpInit) return;
    root.dataset.sklpInit = '1';

    // Signature moment: run the hero load sequence on the next frame.
    requestAnimationFrame(function () { root.setAttribute('data-ready', ''); });

    var reveals = root.querySelectorAll('.sklp-reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < reveals.length; i++) { reveals[i].classList.add('is-in'); }
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('is-in');
          io.unobserve(entries[j].target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    for (var k = 0; k < reveals.length; k++) { io.observe(reveals[k]); }
  }

  init(document);
  // Re-init when re-rendered in the theme editor.
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
