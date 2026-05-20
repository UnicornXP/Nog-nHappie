const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      loginError.textContent = "Please complete the required fields.";
      loginForm.reportValidity();
      return;
    }

    const formData = new FormData(loginForm);
    const isbn = formData.get("isbn")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!isbn) {
      loginError.textContent = "ISBN is required.";
      return;
    }

    loginError.textContent = "";
    window.setAuthenticated(true);
    window.navigateTo("home");
  });
}
