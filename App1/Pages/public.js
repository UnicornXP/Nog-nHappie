(function(){
  // Book series data (image names are expected under Assets/; fallback to cover.jpg)
  const BOOKS = [
    { id: 'yskasterte', img: 'Assets/cover-yskasterte.jpg', titleKey: 'book.yskasterte.title', descKey: 'book.yskasterte.desc', priceKey: 'book.yskasterte.price', altKey: 'book.yskasterte.image_alt' },
    { id: 'plaaskos', img: 'Assets/cover-plaaskos.jpg', titleKey: 'book.plaaskos.title', descKey: 'book.plaaskos.desc', priceKey: 'book.plaaskos.price', altKey: 'book.plaaskos.image_alt' },
    { id: 'braaibroodjies', img: 'Assets/cover-braaibroodjies.jpg', titleKey: 'book.braaibroodjies.title', descKey: 'book.braaibroodjies.desc', priceKey: 'book.braaibroodjies.price', altKey: 'book.braaibroodjies.image_alt' },
    { id: 'koekies', img: 'Assets/cover-koekies.jpg', titleKey: 'book.koekies.title', descKey: 'book.koekies.desc', priceKey: 'book.koekies.price', altKey: 'book.koekies.image_alt' }
  ];

  function renderSeries(){
    const grid = document.getElementById('series-grid');
    if (!grid) return;
    grid.innerHTML = '';
    BOOKS.forEach(b=>{
      const card = document.createElement('div');
      card.className = 'book-card';

      const img = document.createElement('img');
      img.src = b.img;
      img.setAttribute('data-i18n-alt', b.altKey);
      img.alt = '';
      img.dataset._triedSvg = '';
      img.onerror = function(){
        try {
          if (this.dataset._triedSvg === '1') {
            this.onerror = null;
            this.src = 'Assets/cover.svg';
            return;
          }
          // first try the same filename but .svg
          this.dataset._triedSvg = '1';
          var s = this.src || '';
          if (s.match(/\.jpe?g$/i)){
            this.src = s.replace(/\.jpe?g$/i, '.svg');
            return;
          }
        } catch(e){}
        this.onerror = null;
        this.src = 'Assets/cover.svg';
      };

      const h = document.createElement('h3');
      h.setAttribute('data-i18n', b.titleKey);

      const p = document.createElement('p');
      p.setAttribute('data-i18n', b.descKey);

      const priceEl = document.createElement('div');
      priceEl.className = 'book-price';
      priceEl.setAttribute('data-i18n', b.priceKey);

      const actions = document.createElement('div');
      actions.className = 'book-actions';

      const buy = document.createElement('a');
      buy.href = '#buy';
      buy.className = 'btn';
      buy.setAttribute('data-i18n', 'public.buy');
      buy.dataset.bookId = b.id;

      const browse = document.createElement('a');
      browse.href = '?page=home';
      browse.className = 'btn secondary';
      browse.setAttribute('data-i18n', 'public.browse_recipes');

      actions.appendChild(buy);
      actions.appendChild(browse);

      card.appendChild(img);
      card.appendChild(h);
      card.appendChild(priceEl);
      card.appendChild(p);
      card.appendChild(actions);

      grid.appendChild(card);
    });

    // translate dynamic nodes
    if (window.i18n && typeof window.i18n.apply === 'function'){
      try{ window.i18n.apply(grid); }catch(e){}
    }
  }

  // Wire buy buttons to themed modal with localized text
  function onBuyClick(e){
    const a = e.target.closest && e.target.closest('a[href="#buy"]');
    if (!a) return;
    e.preventDefault();
    const msg = (window.i18n && window.i18n.t) ? window.i18n.t('public.buy_modal_msg') : 'Buy link not configured — replace with store URL or implement checkout.';
    const title = (window.i18n && window.i18n.t) ? window.i18n.t('public.buy_modal_title') : 'Buy Book';
    if (window.showModal) window.showModal(msg, title);
    else alert(msg);
  }

  document.addEventListener('click', function(e){
    if (e.target.closest && e.target.closest('#buy-book-hero, a[href="#buy"]')){
      onBuyClick(e);
    }
  });

  // Render on load
  document.addEventListener('DOMContentLoaded', function(){ renderSeries(); });
  // Also render if script loaded after DOM
  renderSeries();
})();
