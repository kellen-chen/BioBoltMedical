/* BioBolt Medical — minimal scroll reveal + smooth anchor */
(function () {
  'use strict';

  // Soft fade-in-on-scroll for major content blocks
  const targets = document.querySelectorAll(
    '.hero__content, .hero__visual, .overview, .team__card, .feature-card, .mini-card, .asset, .cta__inner'
  );

  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  targets.forEach(function (el) { el.classList.add('reveal'); });

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  targets.forEach(function (el) { io.observe(el); });

  // Active nav link state (subtle)
  const navLinks = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length > 0) {
    const navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navLinks.forEach(function (a) {
              a.style.color = a.getAttribute('href') === id ? '' : '';
              if (a.getAttribute('href') === id) {
                a.setAttribute('data-active', 'true');
              } else {
                a.removeAttribute('data-active');
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { navIO.observe(s); });
  }
})();
