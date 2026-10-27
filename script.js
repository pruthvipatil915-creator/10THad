"use strict";

const form = document.querySelector("#registration-form");
const successMessage = document.querySelector("#form-success");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const passwordToggle = document.querySelector("#toggle-password");
const dateOfBirthInput = document.querySelector("#date-of-birth");

const fields = {
  fullName: document.querySelector("#full-name"),
  email: document.querySelector("#email"),
  mobile: document.querySelector("#mobile"),
  password: passwordInput,
  confirmPassword: confirmPasswordInput,
  dateOfBirth: dateOfBirthInput,
  city: document.querySelector("#city"),
  terms: document.querySelector("#terms")
};

const touchedFields = new Set();

function getTodayLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateOfBirthInput.max = getTodayLocalDate();

// Return a field-specific error message, or an empty string when the field is valid.
function getFieldError(fieldName) {
  const value = fields[fieldName]?.value.trim() ?? "";

  switch (fieldName) {
    case "fullName":
      if (!value) return "Please enter your full name.";
      if (value.length < 2) return "Name must contain at least two characters.";
      if (/\d/.test(value)) return "Name must not contain numbers.";
      return "";
    case "email":
      if (!value) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter a valid email address, such as name@example.com.";
      }
      return "";
    case "mobile":
      if (!value) return "Please enter your mobile number.";
      if (!/^\d{10}$/.test(value)) return "Mobile number must contain exactly 10 digits.";
      return "";
    case "password":
      if (!fields.password.value) return "Please enter a password.";
      if (fields.password.value.length < 8) return "Password must be at least 8 characters long.";
      if (!/[A-Z]/.test(fields.password.value)) return "Password must include at least one uppercase letter.";
      if (!/[a-z]/.test(fields.password.value)) return "Password must include at least one lowercase letter.";
      if (!/\d/.test(fields.password.value)) return "Password must include at least one number.";
      return "";
    case "confirmPassword":
      if (!fields.confirmPassword.value) return "Please confirm your password.";
      if (fields.confirmPassword.value !== fields.password.value) return "Passwords do not match.";
      return "";
    case "dateOfBirth":
      if (!fields.dateOfBirth.value) return "Please select your date of birth.";
      if (fields.dateOfBirth.value > getTodayLocalDate()) return "Date of birth cannot be in the future.";
      return "";
    case "city":
      if (!fields.city.value) return "Please select a city.";
      return "";
    case "gender":
      if (!form.querySelector('input[name="gender"]:checked')) return "Please select a gender option.";
      return "";
    case "terms":
      if (!fields.terms.checked) return "You must agree to the terms and conditions.";
      return "";
    default:
      return "";
  }
}

function setFieldState(fieldName, error) {
  const control = fieldName === "gender"
    ? form.querySelector('input[name="gender"]')
    : fields[fieldName];
  const message = document.querySelector(`#${fieldName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}-error`);

  if (error) {
    control.setAttribute("aria-invalid", "true");
    message.textContent = error;
    message.classList.remove("is-valid");
  } else {
    control.setAttribute("aria-invalid", "false");
    message.textContent = "Looks good.";
    message.classList.add("is-valid");
  }
}

function validateField(fieldName) {
  const error = getFieldError(fieldName);
  setFieldState(fieldName, error);
  return !error;
}

// Check every field together so an incomplete form can never show a success message.
function validateAllFields() {
  const fieldNames = [
    "fullName",
    "email",
    "mobile",
    "password",
    "confirmPassword",
    "dateOfBirth",
    "city",
    "gender",
    "terms"
  ];

  touchedFields.clear();
  fieldNames.forEach((fieldName) => touchedFields.add(fieldName));
  return fieldNames.map(validateField).every(Boolean);
}

function validateTouchedField(fieldName) {
  if (touchedFields.has(fieldName)) {
    validateField(fieldName);
  }
}

Object.entries(fields).forEach(([fieldName, field]) => {
  field.addEventListener("blur", () => {
    touchedFields.add(fieldName);
    validateField(fieldName);
  });

  field.addEventListener("input", () => {
    validateTouchedField(fieldName);
    if (fieldName === "password") validateTouchedField("confirmPassword");
  });

  field.addEventListener("change", () => {
    validateTouchedField(fieldName);
  });
});

form.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener("blur", () => {
    touchedFields.add("gender");
    validateField("gender");
  });

  radio.addEventListener("change", () => {
    touchedFields.add("gender");
    validateField("gender");
  });
});

form.addEventListener("submit", (event) => {
  // Keep the demonstration on this page; form data is not sent or stored.
  event.preventDefault();
  successMessage.hidden = true;

  if (!validateAllFields()) {
    const firstInvalidField = form.querySelector('[aria-invalid="true"]');
    firstInvalidField?.focus();
    return;
  }

  successMessage.hidden = false;
  successMessage.focus();
});

passwordToggle.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  confirmPasswordInput.type = shouldShow ? "text" : "password";
  passwordToggle.textContent = shouldShow ? "Hide passwords" : "Show passwords";
  passwordToggle.setAttribute("aria-pressed", String(shouldShow));
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    touchedFields.clear();
    form.querySelectorAll("[aria-invalid]").forEach((control) => control.removeAttribute("aria-invalid"));
    form.querySelectorAll(".field-message").forEach((message) => {
      message.textContent = "";
      message.classList.remove("is-valid");
    });
    successMessage.hidden = true;
    passwordInput.type = "password";
    confirmPasswordInput.type = "password";
    passwordToggle.textContent = "Show passwords";
    passwordToggle.setAttribute("aria-pressed", "false");
  }, 0);
});
