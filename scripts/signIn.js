if (module.hot) {
  module.hot.accept();
}
//selecting inputs
const inputEmail = document.getElementById("signin-email-input");
const inputPass = document.getElementById("signin-password-input");
const inputFirstName = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputBirthdate = document.getElementById("input-birthdate");
//selecting buttons
const nextButton = document.getElementById("signin__next-button");
const submitButton = document.getElementById("signin__regester-button");
//selecting sections
const page1 = document.querySelector(".signin-box");
const page2 = document.querySelector(".signin-box--2");
const pageSucsses = document.querySelector(".sucsses");
//preveting the forms from reloading the page
const forms = document.querySelectorAll("form");
forms.forEach((el) => el.addEventListener("submit", (e) => e.preventDefault()));
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function validEmail(email) {
  const emailPattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
  return emailPattern.test(email) ? true : false;
}

const user = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthdate: "",
};
nextButton.addEventListener("click", function (e) {
  user.email = inputEmail.value;
  user.password = inputPass.value;
  page1.classList.add("hide");
  page2.classList.remove("hide");
});
submitButton.addEventListener("click", function () {
  user.firstName = inputFirstName.value;
  user.lastName = inputLastname.value;
  user.inputUsername = inputUsername.value;
  user.birthdate = inputBirthdate.value;
  const userMAIL = JSON.stringify(user);
  localStorage.setItem("userInfo", userMAIL);
  page2.classList.add("hide");
  pageSucsses.classList.remove("hide");
});
