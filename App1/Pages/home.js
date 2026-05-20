(function(){
  const logout = document.getElementById('logout-btn');
  if (!logout) return;
  logout.addEventListener('click', function(){
    localStorage.removeItem('spaLoggedIn');
    try{ window.dispatchEvent(new CustomEvent('authchange', {detail:{loggedIn:false}})); }catch(e){}
    const url = new URL(location.href);
    url.searchParams.set('page', 'login');
    history.pushState({page:'login'}, '', url.toString());
    if (window.loadPage) window.loadPage('login');
  });

  // Newsletter form handler
  const form = document.getElementById('newsletter-form');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = (document.getElementById('newsletter-email')||{}).value || '';
      const msg = (window.i18n && window.i18n.t) ? window.i18n.t('home.newsletter.thanks') : 'Thanks — you are subscribed!';
      if (!email) return; // ignore empty
      if (window.showModal) window.showModal(msg, '');
      else alert(msg);
      try{ form.reset(); }catch(e){}
    });
  }
})();
