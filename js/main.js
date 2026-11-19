/* Renders every section from DATA (js/data.js) and adds all animations/interactions. */
(function () {
  var D = DATA, I = ICONS, M = ICON_M, $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ic = function (n) { return I[n] || M(n.charAt(0).toUpperCase(), 14); };
  var ZERO_SVG = '<svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="48"/><circle class="fg" cx="60" cy="60" r="48"/></svg>';

  /* ---------- render ---------- */
  document.title = D.name + ' | Web Developer Portfolio';
  $('#logo').textContent = D.logo;
  $('#name').textContent = D.name;
  $('#intro').textContent = D.intro;
  var mailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(D.email) + '&su=' + encodeURIComponent(D.mailSubject || '');
  var soc = '';
  if (D.social.github) soc += '<a href="' + esc(D.social.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + I.GitHub + '</a>';
  if (D.social.linkedin) soc += '<a href="' + esc(D.social.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + I.LinkedIn + '</a>';
  soc += '<a href="' + esc(mailUrl) + '" target="_blank" rel="noopener" aria-label="Email">' + I.Mail + '</a>';
  $('#social').innerHTML = soc;
  $('#mail').href = mailUrl;
  $('#footer').textContent = D.footer;

  var mh = ''; for (var k = 0; k < 2; k++) D.marquee.forEach(function (n) { mh += '<span class="mi">' + ic(n) + esc(n) + '</span>'; });
  $('#mt').innerHTML = mh;

  $('#aboutText').innerHTML = D.about.paragraphs.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  $('#stats').innerHTML = D.about.stats.map(function (s) { return '<div class="stat"><b data-n="' + s.n + '">0</b><small>' + esc(s.label) + '</small></div>'; }).join('');

  $('#skillsGrid').innerHTML = D.skills.map(function (g, i) {
    return '<div class="box rv ' + (i % 2 ? 'R' : 'L') + '"><h3>' + esc(g.title) + '</h3><div class="chips">' +
      g.items.map(function (n) { return '<span class="chip" tabindex="0" role="button" aria-label="' + esc(n) + '"><span class="pill"><span class="ic">' + ic(n) + '</span><span class="nm">' + esc(n) + '</span></span></span>'; }).join('') + '</div></div>';
  }).join('');

  $('#projectsGrid').innerHTML = D.projects.map(function (p, i) {
    return '<div class="card rv Z"><div><span class="num">' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p><div class="chips">' +
      p.tech.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div><div class="btns"><a class="btn p" href="' + esc(p.live) + '" target="_blank" rel="noopener">Live ↗</a><a class="btn" href="' + esc(p.github) + '" target="_blank" rel="noopener">GitHub</a></div></div></div>';
  }).join('');

  var dirs = ['L', 'Z', 'R'];
  $('#achGrid').innerHTML = D.achievements.map(function (a, i) {
    return '<div class="ac rv ' + dirs[i % 3] + '"><span class="yr">' + esc(a.year) + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.desc) + '</p></div>';
  }).join('');

  $('#codingGrid').innerHTML = D.coding.map(function (c) {
    return '<a class="cp rv Z" style="--p:' + c.percent + '" href="' + esc(c.url) + '" target="_blank" rel="noopener"><div class="ring">' + ZERO_SVG + '<b data-n="' + c.count + '">0</b></div><h3>' + esc(c.name) + '</h3><small>' + esc(c.label) + '</small><span class="vp">View profile ↗</span></a>';
  }).join('');

  $('#tl').innerHTML = D.experience.map(function (e) {
    return '<div class="rv L"><small>' + esc(e.period) + '</small><h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p></div>';
  }).join('');

  /* ---------- theme (dark / light) ---------- */
  var root = document.documentElement, tb = $('#theme'), mode = 'dark';
  try { mode = localStorage.getItem('mode') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); } catch (e) { }
  function setMode(m) { mode = m; root.setAttribute('data-theme', m); tb.textContent = m === 'dark' ? '☀' : '☾'; try { localStorage.setItem('mode', m); } catch (e) { } }
  setMode(mode); tb.addEventListener('click', function () { setMode(mode === 'dark' ? 'light' : 'dark'); });

  /* ---------- accessible mobile navigation ---------- */
  var menuToggle = $('#menuToggle'), navLinks = $('#navLinks');
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  /* ---------- split text for letter / word animations ---------- */
  function split(el, letters, cls) {
    var i = 0;
    (function walk(n, inSpan) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = document.createDocumentFragment();
          c.textContent.split(letters ? '' : /(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span'); s.className = cls + (inSpan ? ' g' : ''); s.style.setProperty('--i', i++); s.textContent = p; f.appendChild(s);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) walk(c, true);
      });
    })(el, false);
  }
  split($('#name'), true, 'l');
  document.querySelectorAll('.sp').forEach(function (h) { split(h, false, 'w'); });

  /* ---------- cursor glow, scroll bar, typing ---------- */
  var g = $('#glow'), bar = $('#bar');
  addEventListener('pointermove', function (e) { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
  addEventListener('scroll', function () { bar.style.width = (root.scrollTop / (root.scrollHeight - root.clientHeight) * 100) + '%'; });
  var words = D.roles, wi = 0, ci = 0, del = false, t = $('#type');
  (function tick() {
    var w = words[wi]; t.textContent = w.slice(0, ci);
    if (!del && ci == w.length) { del = true; return setTimeout(tick, 1400); }
    if (del && ci == 0) { del = false; wi = (wi + 1) % words.length; }
    ci += del ? -1 : 1; setTimeout(tick, del ? 40 : 90);
  })();

  /* ---------- scroll reveal + counters ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; var el = e.target; el.classList.add('in');
      el.querySelectorAll('.chip').forEach(function (c, i) { c.style.transitionDelay = (i * 0.08 + 0.25) + 's'; });
      el.querySelectorAll('[data-n]').forEach(function (n) {
        var to = +n.dataset.n, i = 0, s = setInterval(function () { i += Math.ceil(to / 40); if (i >= to) { i = to; clearInterval(s); } n.textContent = i; }, 30);
      });
      io.unobserve(el);
    });
  }, { threshold: .15 });
  document.querySelectorAll('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 0.1 + 's'; io.observe(el); });
  io.observe($('#tl'));

  /* ---------- skill chips: expand in the layout so nearby skills move aside ---------- */

  /* ---------- Responsive skill chip expansion ---------- */

  function place(c) {
    var label = c.querySelector('.nm');
    var container = c.closest('.chips');

    if (!label || !container) return;

    var available = container.clientWidth;
    var needed = 50 + label.scrollWidth + 28;

    var finalWidth = Math.min(needed, available);

    c.style.setProperty(
      '--expanded-width',
      finalWidth + 'px'
    );
  }

  document.querySelectorAll('.sk .chip').forEach(function (c) {

    c.addEventListener('pointerenter', function () {
      place(c);
    });

    c.addEventListener('focus', function () {
      place(c);
    });

    c.addEventListener('click', function () {

      document.querySelectorAll('.sk .chip.open')
        .forEach(function (o) {
          if (o !== c) o.classList.remove('open');
        });

      place(c);
      c.classList.toggle('open');
    });

  });


  /* ---------- project card tilt, magnetic buttons, confetti ---------- */
  document.querySelectorAll('.card').forEach(function (c) {
    var d = c.firstElementChild;
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      d.style.setProperty('--mx', x + 'px'); d.style.setProperty('--my', y + 'px'); c.style.transition = 'transform .1s';
      c.style.transform = 'rotateY(' + ((x / r.width - .5) * 10) + 'deg) rotateX(' + ((.5 - y / r.height) * 10) + 'deg) translateY(-6px)';
    });
    c.addEventListener('pointerleave', function () { c.style.transition = 'transform .5s'; c.style.transform = ''; });
  });
  document.querySelectorAll('.btn').forEach(function (b) {
    b.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .2) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3 - 3) + 'px)'; });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });
  $('#mail').addEventListener('click', function (e) {
    var r = e.currentTarget.getBoundingClientRect(), cs = ['#38bdf8', '#6366f1', '#fbbf24', '#34d399'];
    for (var i = 0; i < 28; i++) {
      var p = document.createElement('span'); p.className = 'cf'; p.style.background = cs[i % 4]; p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + r.height / 2) + 'px'; document.body.appendChild(p);
      var a = Math.random() * 6.28, d = 80 + Math.random() * 120;
      p.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d + 60) + 'px) rotate(' + Math.random() * 720 + 'deg)', opacity: 0 }], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = function () { this.effect.target.remove(); };
    }
  });
})();
