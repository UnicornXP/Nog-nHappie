(function(){
  const appEl = document.getElementById('app');

  function sanitizePageName(name) {
    return (name || '').toString().replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
  }

  function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    let page = params.get('page') || 'login';
    page = sanitizePageName(page);
    return page || 'login';
  }

  function getLangFromUrl(){
    try{
      const p = new URLSearchParams(window.location.search);
      return (p.get('lang')||'').toLowerCase().replace(/[^a-z]/g,'').slice(0,2);
    }catch(e){return null}
  }

  function isLoggedIn() {
    return localStorage.getItem('spaLoggedIn') === 'true';
  }

  // Show/hide navigation items that require auth (e.g. Home)
  function updateNavVisibility(){
    try{
      document.querySelectorAll('a[href]').forEach(a=>{
        try{
          const href = a.getAttribute('href');
          if (!href) return;
          const url = new URL(href, location.href);
          if (url.searchParams.get('page') && sanitizePageName(url.searchParams.get('page')) === 'home'){
            if (!isLoggedIn()) a.style.display = 'none';
            else a.style.display = '';
          }
        }catch(e){}
      });
    }catch(e){}
  }

  function setPageUrl(page, replace){
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    if (replace) history.replaceState({page}, '', url.toString());
    else history.pushState({page}, '', url.toString());
  }

  async function loadPage(page){
    page = sanitizePageName(page);
    if (!page) page = 'login';
    if (page === 'home' && !isLoggedIn()){
      setPageUrl('login', true);
      page = 'login';
    }

    try {
      const res = await fetch(`Pages/${page}.html`);
      if (!res.ok) throw new Error('Page not found');
      const html = await res.text();
      appEl.innerHTML = html;
      if (window.i18n && typeof window.i18n.apply === 'function'){
        try{ window.i18n.apply(appEl); }catch(e){}
      }

      const oldCss = document.getElementById('page-css');
      if (oldCss) oldCss.remove();
      const oldJs = document.getElementById('page-js');
      if (oldJs) oldJs.remove();

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `Pages/${page}.css`;
      link.id = 'page-css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = `Pages/${page}.js`;
      script.id = 'page-js';
      script.onload = function(){
        if (window.i18n && typeof window.i18n.apply === 'function'){
          try{ window.i18n.apply(appEl); }catch(e){}
        }
        try{ updateNavVisibility(); }catch(e){}
      };
      document.body.appendChild(script);
    } catch (err) {
      const title = (window.i18n && window.i18n.t) ? window.i18n.t('page.notfound.title') : 'Page not found';
      const linkText = (window.i18n && window.i18n.t) ? window.i18n.t('page.notfound.link') : 'Go to Login';
      appEl.innerHTML = `<div class="page"><h2>${title}</h2><p><a href="?page=login">${linkText}</a></p></div>`;
    }
  }

  window.loadPage = loadPage;

  // Themed modal API — replaces native alert() for in-app messages
  function hideSpaModal() {
    const modal = document.getElementById('spa-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function showSpaModal(message, title) {
    const modal = document.getElementById('spa-modal');
    if (!modal) {
      // fallback
      alert(message);
      return;
    }
    const titleEl = modal.querySelector('#spa-modal-title');
    const msgEl = modal.querySelector('#spa-modal-message');
    titleEl.textContent = title || '';
    msgEl.textContent = message || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    // handlers
    const ok = modal.querySelector('.spa-modal-ok');
    const close = modal.querySelector('.spa-modal-close');
    const backdrop = modal.querySelector('.spa-modal-backdrop');

    function cleanup() {
      ok.removeEventListener('click', onOk);
      close.removeEventListener('click', onClose);
      backdrop.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onKey);
      hideSpaModal();
    }
    function onOk(){ cleanup(); }
    function onClose(){ cleanup(); }
    function onKey(e){ if (e.key === 'Escape') cleanup(); }

    ok.addEventListener('click', onOk);
    close.addEventListener('click', onClose);
    backdrop.addEventListener('click', onClose);
    document.addEventListener('keydown', onKey);
  }

  // expose globally
  window.showModal = showSpaModal;
  window.hideModal = hideSpaModal;

  window.addEventListener('popstate', function(){
    const page = getPageFromUrl();
    // Register service worker for offline support (if available)
    if ('serviceWorker' in navigator) {
      try{
        navigator.serviceWorker.register('sw.js').then(function(reg){
          console.log('Service Worker registered:', reg.scope);
        }).catch(function(err){
          console.warn('Service Worker registration failed:', err);
        });
      }catch(e){ /* ignore */ }
    }

    loadPage(page);
    // update nav visibility on history navigation
    try{ updateNavVisibility(); }catch(e){}
  });

  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, location.href);
      if (url.origin === location.origin && url.searchParams.has('page')){
        e.preventDefault();
        const page = sanitizePageName(url.searchParams.get('page')) || 'login';
        setPageUrl(page);
        loadPage(page);
      }
    } catch (err) {
      // ignore non-URL hrefs
    }
  });

  document.addEventListener('DOMContentLoaded', function(){
    if (window.i18n && typeof window.i18n.init === 'function'){
      try{ window.i18n.init(); }catch(e){}
    }
    const page = getPageFromUrl();
    // if URL has lang param ensure it's applied
    const lang = getLangFromUrl();
    if (lang && window.i18n && typeof window.i18n.setLang === 'function'){
      try{ window.i18n.setLang(lang, false); }catch(e){}
    }
    // load requested page and then update nav visibility
    loadPage(page).finally(()=>{
      try{ updateNavVisibility(); }catch(e){}
    });
  });

  // react to auth changes (login.js will dispatch this) and storage changes
  window.addEventListener('authchange', function(){ updateNavVisibility(); });
  window.addEventListener('storage', function(e){ if (e.key === 'spaLoggedIn') updateNavVisibility(); });
})();
