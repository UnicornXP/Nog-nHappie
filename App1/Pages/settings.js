(function(){
  const selLang = document.getElementById('lang-select');
  const selTheme = document.getElementById('theme-select');
  
  function setCurrentLang(){
    try{ if (selLang && window.i18n && typeof window.i18n.currentLang === 'function') selLang.value = window.i18n.currentLang(); }catch(e){}
  }

  function setCurrentTheme(){
    try{ if (selTheme && window.theme && typeof window.theme.currentTheme === 'function') selTheme.value = window.theme.currentTheme(); }catch(e){}
  }

  setCurrentLang();
  setCurrentTheme();

  window.addEventListener('languagechange', setCurrentLang);
  window.addEventListener('themechange', setCurrentTheme);

  if (selLang){
    selLang.addEventListener('change', function(){
      const v = selLang.value;
      if (window.i18n && typeof window.i18n.setLang === 'function'){
        window.i18n.setLang(v, true);
      }
    });
  }

  if (selTheme){
    selTheme.addEventListener('change', function(){
      const v = selTheme.value;
      if (window.theme && typeof window.theme.setTheme === 'function'){
        window.theme.setTheme(v, true);
      }
    });
  }

  const btn = document.getElementById('save-settings');
  if (btn){
    btn.addEventListener('click', function(){
      const l = selLang ? selLang.value : null;
      const t = selTheme ? selTheme.value : null;
      if (l && window.i18n) window.i18n.setLang(l, true);
      if (t && window.theme) window.theme.setTheme(t, true);
      // reload current page content so any dynamic JS re-runs
      const params = new URLSearchParams(location.search);
      const page = params.get('page') || 'settings';
      if (window.loadPage) window.loadPage(page);
    });
  }
})();
