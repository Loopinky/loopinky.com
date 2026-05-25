(function () {
  window.loadClarity = function () {
    if (window.__loopinkyClarityLoaded) return;
    if (localStorage.getItem('cookies_accepted') !== 'true') return;

    window.__loopinkyClarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'wvn02r44un');
  };

  window.loadClarity();
})();
