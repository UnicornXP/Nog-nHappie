(function(){
  const TRANSLATIONS = {
    en: {
      'nav.public': 'Public',
      'nav.login': 'Login',
      'nav.home': 'Home',
      'nav.settings': 'Settings',
      'brand.text': 'App1',
      'footer.copy': '© App1 — Simple SPA',

      'login.welcome': 'Welcome back',
      'login.signin_desc': 'Sign in to continue to the Home area.',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.show_password': 'Show password',
      'login.hide_password': 'Hide password',
      'login.isbn_label': 'ISBN number',
      'login.isbn_placeholder': 'Enter ISBN',
      'login.name_label': 'Name',
      'login.name_placeholder': 'Full name',
      'login.email_label': 'Email address',
      'login.email_placeholder': 'you@example.com',
      'login.register_btn': 'Register',
      'login.admin_signin': 'Admin sign-in',
      'login.register_switch': 'Back to register',
      'login.signin_btn': 'Sign in',
      'login.public_btn': 'Public',
      'login.invalid': 'Invalid credentials',
      /* Registration page */
      'register.title': 'Register your purchase',
      'register.instructions': 'Enter the ISBN number and your contact details to register your purchase.',
      'register.isbn': 'ISBN number',
      'register.name': 'Name',
      'register.email': 'Email address',
      'register.submit': 'Register',
      'register.thanks': 'Thanks — your purchase has been registered!',
      'register.invalid_isbn': 'Please enter the ISBN number (required).',
      'register.invalid_email': 'Please enter a valid email address.',
      'register.invalid_title': 'Missing information',

      'home.title': 'Home',
      'home.signedin': "You're signed in as <strong>Admin</strong>.",
      'home.logout': 'Logout',
      'home.getting.started': 'Getting started',
      'home.getting.desc': 'This is a minimal home area. Use the Public page to browse without signing in.',
      'home.open_public': 'Open Public Page',
      'home.hero.title': 'Welcome back, Admin',
      'home.hero.subtitle': 'Overview of your account and recent activity',
      'home.stats.title': 'Overview',
      'home.stats.published': 'Books published',
      'home.stats.followers': 'Followers',
      'home.stats.orders': 'Orders',
      'home.stats.revenue': 'Revenue',
      'home.quick_links.title': 'Quick Links',
      'home.recent.title': 'Recent Activity',
      'home.featured.title': 'Featured Books',
      'home.newsletter.title': 'Stay in the Know',
      'home.newsletter.desc': 'Subscribe for updates and new releases',
      'home.newsletter.placeholder': 'Your email',
      'home.newsletter.button': 'Sign up',
      'home.newsletter.thanks': 'Thanks — you are subscribed!',

      'public.title': 'Public Page',
      'public.desc': 'This page is public and does not require login.',
      'public.open_home': 'Open Home',
      'public.login': 'Login',

      /* Public page (hero/product) */
      'public.hero.title': "Nog 'n Happie",
      'public.hero.subtitle': 'The tastiest South African fridge-tart recipes and kitchen stories',
      'public.register_purchase': 'Register your new purchase now',
      'public.or_browse': 'or <a class="btn secondary" href="#series">Browse the Series</a>',
      'public.view_recipes': 'View Recipes',
      'public.buy_book': 'Buy the Book',
      'public.browse_series': 'Browse the Series',
      'public.buy': 'Buy',
      'public.product.title': "Nog 'n Happie — Fridge Tarts",
      'public.product.desc': "A collection of beloved South African no‑bake fridge‑tart recipes, family stories, and tips for every kitchen.",
      'public.features.1': 'Over 50 classic and modern recipes',
      'public.features.2': 'Step-by-step instructions with photos',
      'public.features.3': 'Family stories and serving suggestions',
      'public.product.buy_price': 'Buy — R199',
      'public.browse_recipes': 'Browse Recipes',
      'public.buy_modal_title': 'Buy Book',
      'public.buy_modal_msg': 'Buy link not configured — replace with store URL or implement checkout.',
      'public.product.image_alt': "Nog 'n Happie book cover",

      /* Series / books */
      'public.series.title': "The Nog 'n Happie Series",

      'book.yskasterte.title': 'Yskasterte',
      'book.yskasterte.desc': 'No-bake fridge-tart recipes beloved by families.',
      'book.yskasterte.price': 'Buy — R199',
      'book.yskasterte.image_alt': "Nog 'n Happie Yskasterte cover",

      'book.plaaskos.title': 'PlaasKos',
      'book.plaaskos.desc': 'Hearty farm-style meals and traditional recipes.',
      'book.plaaskos.price': 'Buy — R199',
      'book.plaaskos.image_alt': "Nog 'n Happie PlaasKos cover",

      'book.braaibroodjies.title': 'Braaibroodjies',
      'book.braaibroodjies.desc': 'Grilled sandwich recipes ideal for braais.',
      'book.braaibroodjies.price': 'Buy — R199',
      'book.braaibroodjies.image_alt': "Nog 'n Happie Braaibroodjies cover",

      'book.koekies.title': 'Koekies',
      'book.koekies.desc': 'Cookie recipes and sweet treats for every occasion.',
      'book.koekies.price': 'Buy — R199',
      'book.koekies.image_alt': "Nog 'n Happie Koekies cover",

      'settings.title': 'Settings',
      'settings.lang.label': 'Language',
      'settings.lang.english': 'English',
      'settings.lang.afrikaans': 'Afrikaans',
      'settings.theme.label': 'Theme',
      'settings.theme.light': 'Light',
      'settings.theme.dark': 'Dark',
      'settings.save': 'Save',

      'page.notfound.title': 'Page not found',
      'page.notfound.link': 'Go to Login'
    },
    af: {
      'nav.public': 'Openbaar',
      'nav.login': 'Teken in',
      'nav.home': 'Tuis',
      'nav.settings': 'Instellings',
      'brand.text': 'App1',
      'footer.copy': '© App1 — Eenvoudige SPA',

      'login.welcome': 'Welkom terug',
      'login.signin_desc': 'Teken in om voort te gaan na die tuis-gebied.',
      'login.username': 'Gebruikersnaam',
      'login.password': 'Wagwoord',
      'login.show_password': 'Wys wagwoord',
      'login.hide_password': 'Verberg wagwoord',
      'login.isbn_label': 'ISBN-nummer',
      'login.isbn_placeholder': 'Voer ISBN in',
      'login.name_label': 'Naam',
      'login.name_placeholder': 'Volle naam',
      'login.email_label': 'E-posadres',
      'login.email_placeholder': 'jy@voorbeeld.com',
      'login.register_btn': 'Registreer',
      'login.admin_signin': "Admin-aanmelding",
      'login.register_switch': 'Terug na registrasie',
      'login.signin_btn': 'Teken in',
      'login.public_btn': 'Openbaar',
      'login.invalid': 'Ongeldige inlogbesonderhede',
      /* Registration page */
      'register.title': 'Registreer jou aankoop',
      'register.instructions': 'Voer die ISBN-nummer en jou kontakbesonderhede in om jou aankoop te registreer.',
      'register.isbn': 'ISBN-nummer',
      'register.name': 'Naam',
      'register.email': 'E-posadres',
      'register.submit': 'Registreer',
      'register.thanks': 'Dankie — jou aankoop is geregistreer!',
      'register.invalid_isbn': 'Voer asseblief die ISBN-nummer in (vereis).',
      'register.invalid_email': 'Voer asseblief ' + "'n" + ' geldige e-posadres in.',
      'register.invalid_title': 'Ontbrekende inligting',

      'home.title': 'Tuis',
      'home.signedin': "Jy is aangemeld as <strong>Admin</strong>.",
      'home.logout': 'Teken uit',
      'home.getting.started': 'Begin hier',
      'home.getting.desc': "Dit is 'n minimale tuis-gebied. Gebruik die Openbare bladsy om sonder aanmelding te blaai.",
      'home.open_public': 'Open Openbare Bladsy',
      'home.hero.title': 'Welkom terug, Admin',
      'home.hero.subtitle': 'Oorsig van jou rekening en onlangse aktiwiteit',
      'home.stats.title': 'Oorsig',
      'home.stats.published': 'Boeke gepubliseer',
      'home.stats.followers': 'Volgers',
      'home.stats.orders': 'Bestellings',
      'home.stats.revenue': 'Inkomste',
      'home.quick_links.title': 'Vinnige Skakels',
      'home.recent.title': 'Onlangse Aktiwiteit',
      'home.featured.title': 'Uitgeligte Boeke',
      'home.newsletter.title': 'Bly op hoogte',
      'home.newsletter.desc': 'Teken in vir opdaterings en nuwe vrystellings',
      'home.newsletter.placeholder': 'Jou e-pos',
      'home.newsletter.button': 'Teken in',
      'home.newsletter.thanks': 'Dankie — jy is ingeteken!',

      'public.title': 'Openbare Bladsy',
      'public.desc': 'Hierdie bladsy is openbaar en vereis nie aanmelding nie.',
      'public.open_home': 'Open Tuis',
      'public.login': 'Teken in',

      /* Public page (hero/product) */
      'public.hero.title': "Nog 'n Happie",
      'public.hero.subtitle': 'Die lekkerste Suid-Afrikaanse yskasterte resepte en kosstories',
      'public.register_purchase': 'Registreer jou nuwe aankoop nou',
      'public.or_browse': 'of <a class="btn secondary" href="#series">Blaai deur die reeks</a>',
      'public.view_recipes': 'Sien Resepte',
      'public.buy_book': 'Koop die Boek',
      'public.browse_series': 'Blaai deur die reeks',
      'public.buy': 'Koop',
      'public.product.title': "Nog 'n Happie — Yskasterte",
      'public.product.desc': "'n Versameling geliefde Suid-Afrikaanse yskastert-resepte, familieverhale en wenke vir elke kombuis.",
      'public.features.1': 'Meer as 50 klassieke en moderne resepte',
      'public.features.2': 'Stap-vir-stap instruksies met foto’s',
      'public.features.3': 'Familieverhale en opdienvoorstelle',
      'public.product.buy_price': 'Koop — R199',
      'public.browse_recipes': 'Blaai Resepte',
      'public.buy_modal_title': 'Koop Boek',
      'public.buy_modal_msg': 'Koopskakel nie geconfigureer nie — vervang met winkel-URL of implementeer betaalstelsel.',
      'public.product.image_alt': "Nog 'n Happie boekomslag",

      /* Series / books */
      'public.series.title': "Die Nog 'n Happie-reeks",

      'book.yskasterte.title': 'Yskasterte',
      'book.yskasterte.desc': 'Yskastert-resepte wat deur die gesin geliefd is.',
      'book.yskasterte.price': 'Koop — R199',
      'book.yskasterte.image_alt': "Nog 'n Happie Yskasterte omslag",

      'book.plaaskos.title': 'PlaasKos',
      'book.plaaskos.desc': 'Stewige plaasgeregte en tradisionele resepte.',
      'book.plaaskos.price': 'Koop — R199',
      'book.plaaskos.image_alt': "Nog 'n Happie PlaasKos omslag",

      'book.braaibroodjies.title': 'Braaibroodjies',
      'book.braaibroodjies.desc': 'Resepte vir geroosterde toebroodjies, perfek vir braaie.',
      'book.braaibroodjies.price': 'Koop — R199',
      'book.braaibroodjies.image_alt': "Nog 'n Happie Braaibroodjies omslag",

      'book.koekies.title': 'Koekies',
      'book.koekies.desc': 'Koekie-resepte en soet bederfies vir elke geleentheid.',
      'book.koekies.price': 'Koop — R199',
      'book.koekies.image_alt': "Nog 'n Happie Koekies omslag",

      'settings.title': 'Instellings',
      'settings.lang.label': 'Taal',
      'settings.lang.english': 'Engels',
      'settings.lang.afrikaans': 'Afrikaans',
      'settings.theme.label': 'Tema',
      'settings.theme.light': 'Lig',
      'settings.theme.dark': 'Donker',
      'settings.save': 'Stoor',

      'page.notfound.title': 'Bladsy nie gevind nie',
      'page.notfound.link': 'Gaan na Aanmelding'
    }
  };

  const STORAGE_KEY = 'spaLang';
  const DEFAULT = 'en';
  let current = DEFAULT;

  function sanitizeLang(l){
    try{ return (l||'').toString().toLowerCase().replace(/[^a-z]/g,'').slice(0,2); }catch(e){return DEFAULT}
  }

  function t(key){
    if (!key) return '';
    const a = TRANSLATIONS[current] && TRANSLATIONS[current][key];
    if (a !== undefined) return a;
    const def = TRANSLATIONS[DEFAULT] && TRANSLATIONS[DEFAULT][key];
    return def !== undefined ? def : key;
  }

  function apply(root=document){
    try{
      root.querySelectorAll && root.querySelectorAll('[data-i18n]').forEach(el=>{
        const k = el.getAttribute('data-i18n');
        const v = t(k);
        if (v !== undefined) el.innerHTML = v;
      });

      root.querySelectorAll && root.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
        const k = el.getAttribute('data-i18n-placeholder');
        const v = t(k);
        if (v !== undefined) el.setAttribute('placeholder', v);
      });

      // set alt attributes for translated images/icons
      root.querySelectorAll && root.querySelectorAll('[data-i18n-alt]').forEach(el=>{
        const k = el.getAttribute('data-i18n-alt');
        const v = t(k);
        if (v !== undefined) el.setAttribute('alt', v);
      });

      document.documentElement.lang = current;
    }catch(e){
      // ignore
    }
  }

  function setLang(lang, updateUrl = true){
    lang = sanitizeLang(lang) || DEFAULT;
    if (!TRANSLATIONS[lang]) lang = DEFAULT;
    current = lang;
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
    if (updateUrl){
      try{
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        history.replaceState({}, '', url.toString());
      }catch(e){}
    }
    apply(document);
    window.dispatchEvent(new CustomEvent('languagechange', {detail:{lang}}));
  }

  function getLangFromUrl(){
    try{
      const p = new URLSearchParams(window.location.search);
      return sanitizeLang(p.get('lang'));
    }catch(e){ return null; }
  }

  function init(){
    const urlLang = getLangFromUrl();
    const stored = (()=>{ try{return localStorage.getItem(STORAGE_KEY)}catch(e){return null}})();
    if (urlLang && TRANSLATIONS[urlLang]) setLang(urlLang, false);
    else if (stored && TRANSLATIONS[stored]) setLang(stored, false);
    else setLang(DEFAULT, false);
  }

  window.i18n = {
    t, apply, setLang, init, getLangFromUrl,
    currentLang: ()=> current,
    translations: TRANSLATIONS,
    langs: Object.keys(TRANSLATIONS)
  };

  document.addEventListener('DOMContentLoaded', function(){
    if (!window.__i18n_inited) { window.i18n.init(); window.__i18n_inited = true; }
  });
})();
