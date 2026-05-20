(function(){
  const STORAGE_KEY = 'spaTheme';
  const DEFAULT = 'light';
  const ALLOWED = ['light','dark'];
  let current = DEFAULT;

  function sanitizeTheme(t){
    try{ return (t||'').toString().toLowerCase().replace(/[^a-z]/g,'').slice(0,5); }catch(e){return DEFAULT}
  }

  function applyTheme(theme){
    if (!theme) theme = DEFAULT;
    if (!ALLOWED.includes(theme)) theme = DEFAULT;
    try{ document.documentElement.setAttribute('data-theme', theme); }catch(e){}
  }

  function setTheme(theme, updateUrl = true){
    theme = sanitizeTheme(theme) || DEFAULT;
    if (!ALLOWED.includes(theme)) theme = DEFAULT;
    current = theme;
    try{ localStorage.setItem(STORAGE_KEY, theme); }catch(e){}
    if (updateUrl){
      try{ const url = new URL(window.location.href); url.searchParams.set('theme', theme); history.replaceState({}, '', url.toString()); }catch(e){}
    }
    applyTheme(theme);
    window.dispatchEvent(new CustomEvent('themechange', {detail:{theme}}));
  }

  function getThemeFromUrl(){
    try{ const p = new URLSearchParams(window.location.search); return sanitizeTheme(p.get('theme')); }catch(e){return null}
  }

  function init(){
    const urlTheme = getThemeFromUrl();
    const stored = (()=>{ try{return localStorage.getItem(STORAGE_KEY)}catch(e){return null}})();
    if (urlTheme && ALLOWED.includes(urlTheme)) setTheme(urlTheme, false);
    else if (stored && ALLOWED.includes(stored)) setTheme(stored, false);
    else setTheme(DEFAULT, false);
  }

  window.theme = { setTheme, applyTheme, init, currentTheme: ()=> current, allowed: ALLOWED };

  document.addEventListener('DOMContentLoaded', function(){
    if (!window.__theme_inited){ window.theme.init(); window.__theme_inited = true; }
  });
})();
