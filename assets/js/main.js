/* Portfolio interactions: focus lens, project ordering, "show more", copy email.
   Everything is readable without JavaScript: the page then shows the "All" view. */
(function () {
  'use strict';

  var LENSES = ['all', 'vision', 'llm'];
  var LIMIT = 7; // featured card + 6 cards (keeps the 2-column grid even)
  var LABELS = { all: 'all work', vision: 'computer vision', llm: 'LLM and data' };
  var TITLES = {
    all: 'Satish Chandra Pamulapati · ML Engineer, Computer Vision & LLMs',
    vision: 'Satish Chandra Pamulapati · Computer Vision Engineer',
    llm: 'Satish Chandra Pamulapati · ML Engineer, LLMs & Data'
  };

  var body = document.body;
  var grid = document.querySelector('[data-projects]');
  var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.project')) : [];
  var moreBtn = document.querySelector('[data-more]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-lens-btn]'));
  var live = document.getElementById('lens-status');

  function has(el, attr, lens) {
    return (el.getAttribute(attr) || '').split(/\s+/).indexOf(lens) !== -1;
  }

  function orderOf(card, lens) {
    var m = (card.getAttribute('data-order') || '').match(new RegExp('(?:^|\\s)' + lens + ':(\\d+)'));
    return m ? parseInt(m[1], 10) : 999;
  }

  function layoutProjects(lens) {
    if (!grid) return;
    var visible = cards
      .filter(function (c) { return has(c, 'data-only', lens); })
      .sort(function (a, b) { return orderOf(a, lens) - orderOf(b, lens); });

    visible.forEach(function (c) { grid.appendChild(c); });

    cards.forEach(function (c) { c.classList.remove('is-extra', 'is-featured'); });
    // Hide cards beyond LIMIT behind "Show more", unless only one would be hidden.
    var limit = visible.length - LIMIT > 1 ? LIMIT : visible.length;
    visible.forEach(function (c, i) {
      if (i === 0 && has(c, 'data-featured', lens)) c.classList.add('is-featured');
      if (i >= limit) c.classList.add('is-extra');
    });

    var extra = visible.length - limit;
    grid.classList.remove('expanded');
    if (moreBtn) {
      moreBtn.hidden = extra === 0;
      moreBtn.setAttribute('aria-expanded', 'false');
      moreBtn.setAttribute('data-count', String(extra));
      moreBtn.textContent = 'Show ' + extra + ' more project' + (extra === 1 ? '' : 's');
    }
  }

  function apply(lens, fromUser) {
    if (LENSES.indexOf(lens) === -1) lens = 'all';
    body.setAttribute('data-focus', lens);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lens-btn') === lens));
    });
    layoutProjects(lens);
    document.title = TITLES[lens];

    if (fromUser) {
      try {
        var url = new URL(window.location.href);
        if (lens === 'all') url.searchParams.delete('focus');
        else url.searchParams.set('focus', lens);
        window.history.replaceState(null, '', url.toString());
      } catch (e) { /* older browsers: the lens still works, the URL just does not update */ }
      if (live) live.textContent = 'Showing ' + LABELS[lens] + '.';
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lens-btn'), true); });
  });

  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      var open = grid.classList.toggle('expanded');
      moreBtn.setAttribute('aria-expanded', String(open));
      var n = moreBtn.getAttribute('data-count');
      moreBtn.textContent = open ? 'Show fewer projects' : 'Show ' + n + ' more project' + (n === '1' ? '' : 's');
      if (!open) grid.scrollIntoView({ block: 'start' });
    });
  }

  // Initial lens from ?focus=vision | ?focus=llm
  var initial = 'all';
  try { initial = new URLSearchParams(window.location.search).get('focus') || 'all'; } catch (e) {}
  apply(initial, false);

  // Optional headshot: shows assets/img/headshot.jpg if it exists, otherwise the initials stay.
  var photo = document.querySelector('.avatar img');
  if (photo) {
    var drop = function () { if (photo.parentNode) photo.parentNode.removeChild(photo); };
    photo.addEventListener('error', drop);
    if (photo.complete && photo.naturalWidth === 0) drop();
  }

  // Copy email
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var label = btn.querySelector('span');
      var done = function () {
        if (label) label.textContent = 'Copied';
        setTimeout(function () { if (label) label.textContent = 'Copy'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
  });

  // Print: show every project in the current lens.
  window.addEventListener('beforeprint', function () { if (grid) grid.classList.add('expanded'); });
})();
