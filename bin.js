let activeTab = "login";

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const formTitle = document.getElementById("formTitle");
const confirmPassword = document.getElementById("confirmPassword");
const forgot = document.getElementById("forgot");
const submitBtn = document.getElementById("submitBtn");
const footerText = document.getElementById("footerText");
const footerBtn = document.getElementById("footerBtn");
const authForm = document.getElementById("authForm");

function switchTab(tab) {
  activeTab = tab;

  loginTab.classList.toggle("active", tab === "login");
  signupTab.classList.toggle("active", tab === "signup");

  formTitle.textContent = tab === "login" ? "Login" : "Signup";
  submitBtn.textContent = tab === "login" ? "LOGIN" : "SIGNUP";

  confirmPassword.classList.toggle("hidden", tab === "login");
  forgot.classList.toggle("hidden", tab === "signup");

  footerText.innerHTML =
    tab === "login"
      ? `Not a member? <button id="footerBtn">Signup now</button>`
      : `Already a member? <button id="footerBtn">Login now</button>`;

  document.getElementById("footerBtn").onclick = () =>
    switchTab(tab === "login" ? "signup" : "login");
}

loginTab.onclick = () => switchTab("login");
signupTab.onclick = () => switchTab("signup");

authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(authForm).entries());

  // Basic validation for signup
  if (activeTab === "signup") {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  }

  // Simulate successful login/signup
  alert(`${activeTab === "login" ? "Login" : "Signup"} successful!`);

  // REDIRECT TO DETECTION PAGE
  window.location.href = "Detection/detector.html";
});