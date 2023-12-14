const inputFirstName = document.getElementById("InputFirstName");
const inputLastName = document.getElementById("InputLastName");
const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnRegister = document.getElementById("btnRegister");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnRegister.addEventListener("click", async (e) => {
  console.log("clic");
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  if (firstName && lastName && emailRegExp.test(email) && password) {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    const response = await axios.post("/registerUser", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
    console.log(response.data);
  }
});
