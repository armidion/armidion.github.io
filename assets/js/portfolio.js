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

  var timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    var timelinePoints = Array.from(timeline.querySelectorAll('.timeline-point'));
    var detailDate = timeline.querySelector('[data-timeline-date]');
    var detailTitle = timeline.querySelector('[data-timeline-title]');
    var detailCopy = timeline.querySelector('[data-timeline-copy]');
    var detailState = timeline.querySelector('[data-timeline-state]');
    var detailPanel = timeline.querySelector('.timeline-detail');

    function selectTimelinePoint(point, shouldFocus) {
      timelinePoints.forEach(function (item) {
        var selected = item === point;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });

      detailDate.textContent = point.dataset.date;
      detailTitle.textContent = point.dataset.title;
      detailCopy.textContent = point.dataset.copy;
      detailPanel.setAttribute('aria-labelledby', point.id);
      detailState.textContent = point.classList.contains('is-current')
        ? 'Current'
        : point.classList.contains('is-future') ? 'Planned' : 'Past';

      point.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      if (shouldFocus) point.focus();
    }

    timelinePoints.forEach(function (point, index) {
      point.id = 'timeline-point-' + index;
      point.tabIndex = point.classList.contains('is-selected') ? 0 : -1;

      point.addEventListener('click', function () {
        selectTimelinePoint(point, false);
      });

      point.addEventListener('keydown', function (event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = Math.min(timelinePoints.length - 1, index + 1);
        if (event.key === 'ArrowLeft') nextIndex = Math.max(0, index - 1);
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = timelinePoints.length - 1;
        if (nextIndex === index) return;
        event.preventDefault();
        selectTimelinePoint(timelinePoints[nextIndex], true);
      });
    });

    detailPanel.setAttribute('aria-labelledby', timelinePoints[0].id);
  }

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
