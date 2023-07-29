function isUsernameValid(username) {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{3,}$/;
  return usernameRegex.test(username);
}

function isPasswordValid(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isNameValid(name) {
  const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
  return nameRegex.test(name);
}

module.exports = {
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
  isNameValid,
};
