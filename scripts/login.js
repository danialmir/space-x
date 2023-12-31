if (module.hot) {
  module.hot.accept();
}
//selectiing inputs
const inputEmail = document.getElementById("login-email-input");
const inputPass = document.getElementById("login-password-input");
const errMsg = document.querySelector(".err-msg");
//selecting buttons
const regestBtn = document.getElementById("login__next-button");
//preventing the forms from reloading the page
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
////////////////////////////////////////////////////////////////
regestBtn.addEventListener("click", function (e) {
  const email = inputEmail.value;
  const pass = inputPass.value;
  const userSTR = localStorage.getItem("userInfo");
  const user = JSON.parse(userSTR);
  if (!user) errMsg.textContent = "please signin";
  if (user.email === email && user.password === pass) {
    window.location.replace("app.html");
  } else {
    inputEmail.classList.add("input--error");
    inputPass.classList.add("input--error");
    errMsg.textContent =
      user.password !== pass
        ? "the Password is incorrect"
        : "the Email is incorrect";
  }
});
