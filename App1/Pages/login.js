(function(){
  // Register form
  const regForm = document.getElementById('register-form');
  const adminForm = document.getElementById('admin-form');
  const showAdmin = document.getElementById('show-admin');
  const showRegister = document.getElementById('show-register');

  function showSection(name){
    const reg = document.getElementById('register-section');
    const admin = document.getElementById('admin-section');
    if (!reg || !admin) return;
    if (name === 'admin'){
      reg.style.display = 'none'; admin.style.display = '';
      const u = document.getElementById('username'); if (u) u.focus();
    } else {
      reg.style.display = ''; admin.style.display = 'none';
      const i = document.getElementById('isbn'); if (i) i.focus();
    }
  }

  if (showAdmin) showAdmin.addEventListener('click', function(e){ e.preventDefault(); showSection('admin'); });
  if (showRegister) showRegister.addEventListener('click', function(e){ e.preventDefault(); showSection('register'); });

  if (regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      const isbn = (document.getElementById('isbn')||{}).value.trim();
      const name = (document.getElementById('reg-name')||{}).value.trim();
      const email = (document.getElementById('reg-email')||{}).value.trim();
      if (!isbn){
        const title = (window.i18n && window.i18n.t) ? window.i18n.t('register.invalid_title') : 'Missing information';
        const msg = (window.i18n && window.i18n.t) ? window.i18n.t('register.invalid_isbn') : 'Please enter the ISBN number (required).';
        if (window.showModal) window.showModal(msg, title); else alert(msg);
        return;
      }
      if (email && !/^\S+@\S+\.\S+$/.test(email)){
        const title = (window.i18n && window.i18n.t) ? window.i18n.t('register.invalid_title') : 'Missing information';
        const msg = (window.i18n && window.i18n.t) ? window.i18n.t('register.invalid_email') : 'Please enter a valid email address.';
        if (window.showModal) window.showModal(msg, title); else alert(msg);
        return;
      }
      try{
        const key = 'spaRegistrations';
        const cur = JSON.parse(localStorage.getItem(key) || '[]');
        cur.push({isbn, name, email, ts: new Date().toISOString()});
        localStorage.setItem(key, JSON.stringify(cur));
      }catch(e){ /* ignore */ }
      const thanks = (window.i18n && window.i18n.t) ? window.i18n.t('register.thanks') : 'Thanks — your purchase has been registered!';
      if (window.showModal) window.showModal(thanks, (window.i18n && window.i18n.t) ? window.i18n.t('register.title') : '');
      regForm.reset();
    });
  }

  if (adminForm){
    adminForm.addEventListener('submit', function(e){
      e.preventDefault();
      const username = (document.getElementById('username')||{}).value || '';
      const password = (document.getElementById('password')||{}).value || '';
      if (username === 'Admin' && password === 'Admin'){
        localStorage.setItem('spaLoggedIn', 'true');
        try{ window.dispatchEvent(new CustomEvent('authchange', {detail:{loggedIn:true}})); }catch(e){}
        const url = new URL(location.href); url.searchParams.set('page', 'home'); history.pushState({page:'home'}, '', url.toString());
        if (window.loadPage) window.loadPage('home');
      } else {
        const msg = (window.i18n && window.i18n.t) ? window.i18n.t('login.invalid') : 'Invalid credentials';
        if (window.showModal) window.showModal(msg); else alert(msg);
      }
    });
  }
})();
