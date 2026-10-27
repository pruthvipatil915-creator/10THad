# Registration Form — Client-Side Validation

A beginner-friendly practical demonstrating a responsive registration form built with HTML5, CSS3, and vanilla JavaScript. The project runs directly in a browser and requires no server, database, packages, or build tools.

## Project files

```text
form-validation/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Requirements demonstrated

- Full name: required, at least two characters, and no numbers.
- Email: required and checked for a valid email format.
- Mobile number: exactly 10 digits.
- Password: at least 8 characters with an uppercase letter, lowercase letter, and number.
- Confirm password: required and must match the password.
- Gender: one option must be selected.
- Date of birth: required and cannot be in the future.
- City: choose an option from the dropdown.
- Terms: checkbox must be selected.
- Fields are checked on blur and again when the form is submitted. Invalid fields show specific messages; valid fields show a green confirmation.
- The visibility button shows or hides both password fields. Reset clears validation feedback and the success message.
- A valid submission displays an on-page confirmation without reloading, saving, or transmitting information.

## Run on Windows using VS Code

1. Open VS Code and choose **File > Open Folder...**.
2. Create or open the practical's parent folder, then create a folder named `form-validation`.
3. Inside it, create `index.html`, `style.css`, and `script.js`. Add the corresponding source code to each file. Keep this `README.md` in the same folder.
4. Save all files.
5. In File Explorer, open `form-validation` and double-click `index.html`, or in VS Code right-click `index.html` and choose **Reveal in File Explorer**, then open it in your browser.
6. No npm installation, database, extension, or server setup is needed.

## Publish with GitHub Pages

The included `.github/workflows/deploy-pages.yml` workflow publishes the static site whenever code is pushed to the `main` branch, or when the workflow is run manually.

1. Create a **public** GitHub repository named `form-validation`.
2. Push this project folder's contents to the repository's `main` branch.
3. In the repository, open **Settings > Pages** and set the build and deployment source to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy static site to GitHub Pages** to complete.
5. Open **Settings > Pages** to find the published site URL. It will normally be `https://OWNER.github.io/form-validation/`.

## Manual test cases

1. Click **Create Account** with every field empty. Required-field errors should appear and no success message should be shown.
2. Enter an invalid email (for example, `alex@`) and leave the field. The email error should appear.
3. Enter a mobile number with fewer than 10 digits and leave the field. The exact-length error should appear.
4. Enter a weak password (for example, `abc`) and leave the field. Password requirement errors should appear.
5. Enter a valid password and a different confirmation. The mismatch error should appear.
6. Submit without selecting a gender. The gender error should appear.
7. Choose a future date of birth. The date error should appear; the date picker also limits selection to today.
8. Leave the terms checkbox unchecked and submit. The terms error should appear.
9. Complete every field with valid values, select a gender, city, and terms checkbox, then submit. The green success message should appear without reloading the page.
10. Click **Reset Form**. Inputs, selection controls, validation messages, and the success message should be cleared.

## Practical journal screenshot captions

1. **Initial Registration Form:** the untouched form with all registration fields visible.
2. **Empty-Form Validation:** field-specific errors shown after submitting the empty form.
3. **Email and Mobile Errors:** invalid email and a mobile number with fewer than 10 digits.
4. **Password Mismatch:** a valid password paired with a different confirmation value.
5. **Successful Validation:** all fields valid and the client-side success message displayed.
6. **Reset Functionality:** cleared form after clicking Reset Form.

## Security and scope

Client-side checks improve the form demonstration but are not a substitute for server-side validation in a production application. This project does not have a backend and does not save or transmit form data.
