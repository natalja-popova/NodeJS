import validator from "validator";

export const capitalizeText = (text) => {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validatePsw = (psw) => {
  const regex = /^(?=.*\d)[A-Za-z0-9!@#$%^&*_\-+=?]{6,}$/;
  return regex.test(psw);
};
