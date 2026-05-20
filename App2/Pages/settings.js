const languageSelect = document.getElementById("languageSelect");
const themeSelect = document.getElementById("themeSelect");
const settingsSaved = document.getElementById("settingsSaved");

function updateSavedMessage() {
  if (!settingsSaved) {
    return;
  }
  settingsSaved.textContent = window.t("settings.saved") || "Settings updated.";
}

if (languageSelect) {
  languageSelect.value = window.getLanguage();

  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    window.setLanguage(selectedLanguage);
    updateSavedMessage();
  });
}

if (themeSelect) {
  themeSelect.value = window.getTheme();

  themeSelect.addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    window.setTheme(selectedTheme);
    updateSavedMessage();
  });
}

window.addEventListener("languagechanged", (event) => {
  if (languageSelect) {
    languageSelect.value = event.detail.language;
  }
  updateSavedMessage();
});

window.addEventListener("themechanged", (event) => {
  if (themeSelect) {
    themeSelect.value = event.detail.theme;
  }
  updateSavedMessage();
});
