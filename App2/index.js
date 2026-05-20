const supportedPages = ["login", "home", "public", "settings"];
const supportedLanguages = { en: "English", af: "Afrikaans" };
const supportedThemes = { light: "Light", dark: "Dark" };
const defaultPage = "login";
const defaultLang = "en";
const defaultTheme = "light";
const viewElement = document.getElementById("view");
const authStorageKey = "app2-authenticated";
const langStorageKey = "app2-language";
const themeStorageKey = "app2-theme";

const translations = {
  en: {
    nav: {
      login: "Login",
      home: "Home",
      public: "Public",
      settings: "Settings"
    },
    login: {
      title: "Register",
      description: "Please register below.",
      usernameLabel: "Username",
      passwordLabel: "Password",
      usernamePlaceholder: "Admin",
      passwordPlaceholder: "Admin",
      signIn: "Register",
      error: "Invalid credentials. Use Admin / Admin.",
      publicNote: "Public access is available on the ",
      publicPage: "Public page"
    },
    home: {
      title: "Home",
      description: "Welcome to the protected home page. You have successfully logged in.",
      logout: "Log Out",
      goPublic: "Go to Public Page"
    },
    public: {
      title: "Nog 'n Happie",
      description: "Explore the full Nog 'n Happie cookbook series featuring South African dessert classics, family recipes, seasonal treats, and farm-style kitchen stories.",
      backToLogin: "Back to Login",
      protectedHome: "Sign In"
    },
    settings: {
      title: "Settings",
      description: "Select your preferred language and color theme.",
      languageLabel: "Language",
      english: "English",
      afrikaans: "Afrikaans",
      themeLabel: "Theme",
      light: "Light",
      dark: "Dark",
      saved: "Settings updated."
    },
    error: {
      notFound: "Page not found",
      unableLoad: "The page \"{page}\" could not be loaded."
    }
  },
  af: {
    nav: {
      login: "Aanmelding",
      home: "Tuis",
      public: "Openbaar",
      settings: "Instellings"
    },
    login: {
      title: "Meld aan",
      description: "Meld asseblief aan met jou geloofsbriewe om voort te gaan.",
      usernameLabel: "Gebruikersnaam",
      passwordLabel: "Wagwoord",
      usernamePlaceholder: "Admin",
      passwordPlaceholder: "Admin",
      signIn: "Teken in",
      error: "Ongeldige geloofsbriewe. Gebruik Admin / Admin.",
      publicNote: "Openbare toegang is beskikbaar op die ",
      publicPage: "Publieke bladsy"
    },
    home: {
      title: "Tuiste",
      description: "Welkom by die beskermde tuisblad. Jy is suksesvol aangemeld.",
      logout: "Teken uit",
      goPublic: "Gaan na die Publieke bladsy"
    },
    public: {
      title: "Nog 'n Happie",
      description: "Verken die volledige Nog 'n Happie-kookboekreeks met Suid-Afrikaanse nageregklassiekers, familie- en seisoenresepte, en plaasstyl kombuisstories.",
      backToLogin: "Terug na Aanmelding",
      protectedHome: "Teken In"
    },
    settings: {
      title: "Instellings",
      description: "Kies jou voorkeurtaal en kleur-tema.",
      languageLabel: "Taal",
      english: "Engels",
      afrikaans: "Afrikaans",
      themeLabel: "Tema",
      light: "Ligte",
      dark: "Donker",
      saved: "Instellings opgedateer."
    },
    error: {
      notFound: "Bladsy nie gevind nie",
      unableLoad: "Die bladsy \"{page}\" kon nie gelaai word nie."
    }
  }
};

function isAuthenticated() {
  return sessionStorage.getItem(authStorageKey) === "true";
}

function setAuthenticated(value) {
  sessionStorage.setItem(authStorageKey, value ? "true" : "false");
}

function normalizePage(page) {
  if (!page || !supportedPages.includes(page)) {
    return defaultPage;
  }

  if (page === "home" && !isAuthenticated()) {
    return "public";
  }

  if (page === "login" && isAuthenticated()) {
    return "home";
  }

  return page;
}

function normalizeLanguage(lang) {
  if (lang && supportedLanguages[lang]) {
    return lang;
  }

  const storedLang = localStorage.getItem(langStorageKey);
  if (storedLang && supportedLanguages[storedLang]) {
    return storedLang;
  }

  return defaultLang;
}

function normalizeTheme(theme) {
  if (theme && supportedThemes[theme]) {
    return theme;
  }

  const storedTheme = localStorage.getItem(themeStorageKey);
  if (storedTheme && supportedThemes[storedTheme]) {
    return storedTheme;
  }

  return defaultTheme;
}

function getPageParam() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  if (!page || !supportedPages.includes(page)) {
    return isAuthenticated() ? "home" : "public";
  }

  return normalizePage(page);
}

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  return normalizeLanguage(params.get("lang"));
}

function getTheme() {
  const params = new URLSearchParams(window.location.search);
  return normalizeTheme(params.get("theme"));
}

function applyTheme(theme) {
  const normalized = normalizeTheme(theme);
  document.documentElement.classList.remove("theme-light", "theme-dark");
  document.documentElement.classList.add(`theme-${normalized}`);
}

function updateNavigation() {
  const isAuth = isAuthenticated();
  document.querySelectorAll("nav.page-nav a[data-page]").forEach((link) => {
    const page = link.dataset.page;
    if (page === "home") {
      link.hidden = !isAuth;
    }
  });
}

function getTranslation(key) {
  const lang = getLanguage();
  const keys = key.split(".");
  let current = translations[lang] || translations[defaultLang];

  for (const part of keys) {
    if (current == null) {
      return null;
    }
    current = current[part];
  }

  return typeof current === "string" ? current : null;
}

function translateNav() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key || !key.startsWith("nav.")) {
      return;
    }

    const translation = getTranslation(key);
    if (translation) {
      element.textContent = translation;
    }
  });
}

function translatePage(page) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key || key.startsWith("nav.")) {
      return;
    }

    const translation = getTranslation(key);
    if (translation) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const translation = getTranslation(key);
    if (translation) {
      element.placeholder = translation;
    }
  });

  document.querySelectorAll("[data-i18n-value]").forEach((element) => {
    const key = element.dataset.i18nValue;
    const translation = getTranslation(key);
    if (translation) {
      element.value = translation;
    }
  });

  const pageTitle = getTranslation(`${page}.title`);
  if (pageTitle) {
    document.title = `App2 SPA · ${pageTitle}`;
  }

  translateNav();
}

function updateUrl(page, replace = false, lang = getLanguage(), theme = getTheme()) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", page);
  url.searchParams.set("lang", lang);
  url.searchParams.set("theme", theme);

  if (replace) {
    window.history.replaceState({ page }, "", url);
  } else {
    window.history.pushState({ page }, "", url);
  }
}

function removePageAssets() {
  const oldStyle = document.querySelector("link[data-page-style]");
  if (oldStyle) {
    oldStyle.remove();
  }

  const oldScript = document.querySelector("script[data-page-script]");
  if (oldScript) {
    oldScript.remove();
  }
}

function loadPageAssets(page) {
  removePageAssets();

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = `Pages/${page}.css`;
  styleLink.dataset.pageStyle = page;
  document.head.appendChild(styleLink);

  const pageScript = document.createElement("script");
  pageScript.src = `Pages/${page}.js`;
  pageScript.dataset.pageScript = page;
  document.body.appendChild(pageScript);
}

async function loadPage(page, replaceHistory = false) {
  const normalizedPage = normalizePage(page);
  const currentTheme = getTheme();
  applyTheme(currentTheme);
  updateNavigation();
  updateUrl(normalizedPage, replaceHistory, getLanguage(), currentTheme);

  try {
    const response = await fetch(`Pages/${normalizedPage}.html`);
    if (!response.ok) {
      throw new Error(`Unable to load page: ${normalizedPage}`);
    }

    const html = await response.text();
    viewElement.innerHTML = html;
    translatePage(normalizedPage);
    loadPageAssets(normalizedPage);
  } catch (error) {
    const errorMessage = getTranslation("error.unableLoad")?.replace("{page}", normalizedPage) || `The page "${normalizedPage}" could not be loaded.`;
    viewElement.innerHTML = `<section class="error-shell"><h1>${getTranslation("error.notFound") || "Page not found"}</h1><p>${errorMessage}</p></section>`;
    document.title = "App2 SPA · Not Found";
  }
}

function setLanguage(language) {
  const normalized = normalizeLanguage(language);
  localStorage.setItem(langStorageKey, normalized);
  updateUrl(getPageParam(), true, normalized, getTheme());
  translatePage(getPageParam());
  const languageChangeEvent = new CustomEvent("languagechanged", { detail: { language: normalized } });
  window.dispatchEvent(languageChangeEvent);
}

function setTheme(theme) {
  const normalized = normalizeTheme(theme);
  localStorage.setItem(themeStorageKey, normalized);
  applyTheme(normalized);
  updateUrl(getPageParam(), true, getLanguage(), normalized);
  const themeChangeEvent = new CustomEvent("themechanged", { detail: { theme: normalized } });
  window.dispatchEvent(themeChangeEvent);
}

window.setAuthenticated = setAuthenticated;
window.logout = () => {
  setAuthenticated(false);
  loadPage("login");
};

window.setLanguage = setLanguage;
window.getTheme = getTheme;
window.setTheme = setTheme;
window.getLanguage = getLanguage;
window.supportedLanguages = supportedLanguages;
window.supportedThemes = supportedThemes;
window.t = getTranslation;

window.navigateTo = (page) => {
  if (!supportedPages.includes(page)) {
    return;
  }

  loadPage(page);
};

window.addEventListener("popstate", (event) => {
  const page = event.state?.page || getPageParam();
  loadPage(page, true);
});

window.addEventListener("DOMContentLoaded", () => {
  const initialPage = getPageParam();
  loadPage(initialPage, true);

  document.body.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[data-link]");
    if (!anchor) {
      return;
    }

    event.preventDefault();
    const url = new URL(anchor.href, window.location.href);
    const page = url.searchParams.get("page") || defaultPage;
    navigateTo(page);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  }
});
