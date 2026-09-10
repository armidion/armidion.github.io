(function () {
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');

  menuToggle.addEventListener('click', function () {
    var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (node) {
    revealObserver.observe(node);
  });

  var sectionLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
  var sections = Array.from(sectionLinks).map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });
})();
