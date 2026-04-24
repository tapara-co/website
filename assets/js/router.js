(function () {
  var ACTIVE_DESKTOP = 'font-serif text-lg tracking-tight text-neutral-900 font-semibold border-b-2 border-neutral-900 pb-1';
  var INACTIVE_DESKTOP = 'font-serif text-lg tracking-tight text-neutral-500 hover:text-neutral-800 transition-colors';
  var ACTIVE_MOBILE = 'flex flex-col items-center justify-center text-neutral-900';
  var INACTIVE_MOBILE = 'flex flex-col items-center justify-center text-neutral-400 hover:text-neutral-900';

  /* ── Scroll-reveal observer ── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function observeSections(root) {
    root.querySelectorAll('section').forEach(function (sec) {
      sec.classList.add('reveal');
      observer.observe(sec);
    });
  }

  // Reveal sections on initial page load
  observeSections(document.querySelector('main') || document.body);

  /* ── SPA router ── */
  var ROUTE_MAP = {
    '/': '/', '/consumers': '/consumers', '/businesses': '/businesses',
    '/merchants': '/businesses',
    '/about': '/about', '/contact': '/contact'
  };

  function pageFromUrl(url) {
    var path = new URL(url, location.href).pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    return ROUTE_MAP[path] || path;
  }

  function toHtmlUrl(url) {
    var u = new URL(url, location.href);
    var path = u.pathname.replace(/\/$/, '') || '/';
    if (path === '/') return u.origin + '/index.html';
    if (!/\.html$/.test(path)) return u.origin + path + '.html';
    return url;
  }

  function updateNav(page) {
    var desktopNav = document.querySelector('nav .hidden.md\\:flex');
    if (desktopNav) {
      desktopNav.querySelectorAll('a[href]').forEach(function (a) {
        var target = a.getAttribute('href') === page ? ACTIVE_DESKTOP : INACTIVE_DESKTOP;
        if (a.className !== target) a.className = target;
      });
    }
    var mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0');
    if (mobileNav) {
      mobileNav.querySelectorAll('a[href]').forEach(function (a) {
        var isActive = a.getAttribute('href') === page;
        var target = isActive ? ACTIVE_MOBILE : INACTIVE_MOBILE;
        if (a.className !== target) a.className = target;
        var label = a.querySelector('span:last-child');
        if (label) {
          label.classList.toggle('font-bold', isActive);
          label.classList.toggle('font-medium', !isActive);
        }
      });
    }
  }

  function reloadIframes(container) {
    container.querySelectorAll('iframe').forEach(function (iframe) {
      iframe.style.opacity = '0';
      var src = iframe.getAttribute('src');
      if (src) iframe.src = src;
    });
  }

  function loadPage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 0) {
        callback(null, xhr.responseText);
      } else {
        callback(new Error(xhr.status));
      }
    };
    xhr.onerror = function () { callback(new Error('network')); };
    try { xhr.send(); } catch (e) { callback(e); }
  }

  function navigate(url, pushState) {
    var page = pageFromUrl(url);
    var fetchUrl = toHtmlUrl(location.origin + page);
    var displayUrl = page === '/' ? '/' : page;
    var oldMain = document.querySelector('main');

    // Fade out current content
    if (oldMain) oldMain.classList.add('swap-out');

    loadPage(fetchUrl, function (err, html) {
      if (err) { location.href = url; return; }

      var doc = new DOMParser().parseFromString(html, 'text/html');
      var newMain = doc.querySelector('main');

      if (!newMain || !oldMain) { location.href = url; return; }

      // Wait for fade-out to finish, then swap
      setTimeout(function () {
        // Remove initial animation so swap-in plays fresh
        newMain.style.animation = 'none';
        newMain.classList.add('swap-in');
        oldMain.replaceWith(newMain);
        reloadIframes(newMain);
        observeSections(newMain);

        document.title = doc.title;

        // Sync body class so inherited styles match the new page
        if (doc.body.className) document.body.className = doc.body.className;

        var nd = doc.querySelector('meta[name="description"]');
        var od = document.querySelector('meta[name="description"]');
        if (nd && od) od.setAttribute('content', nd.getAttribute('content'));

        updateNav(page);
        if (pushState) history.pushState({ page: page }, '', displayUrl);
        window.scrollTo(0, 0);
      }, 150);
    });
  }

  function resolveUrl(href) {
    var a = document.createElement('a');
    a.href = href;
    return a.href;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href || href === '#' || href.charAt(0) === '#') return;
    if (href.indexOf('://') !== -1 && href.indexOf(location.origin) !== 0) return;
    var clean = href.replace(/\.html$/, '').replace(/\/index$/, '/');
    if (!(clean in ROUTE_MAP) && !/\.html$/.test(href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.hasAttribute('download') || a.target === '_blank') return;

    var resolved = resolveUrl(href);
    if (resolved === location.href) return;

    e.preventDefault();
    navigate(resolved, true);
  });

  window.addEventListener('popstate', function () {
    navigate(location.href, false);
  });

  // Contact form handler (event delegation so it works after SPA navigation)
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('#contact-form');
    if (!form) return;
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    fetch('https://formspree.io/f/mkopzwop', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (r) {
      if (r.ok) {
        form.classList.add('hidden');
        document.getElementById('form-success').classList.remove('hidden');
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again.');
      }
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Something went wrong. Please try again.');
    });
  });

  // Handle SPA redirect from 404.html
  var redirect = sessionStorage.getItem('spa-redirect');
  if (redirect) {
    sessionStorage.removeItem('spa-redirect');
    if (redirect !== '/') {
      history.replaceState(null, '', redirect);
      navigate(location.origin + redirect, false);
    }
  }
})();
