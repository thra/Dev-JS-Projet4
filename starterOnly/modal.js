function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close-modal");
const modalBtnSubmit = document.querySelectorAll(".btn-submit");
const form = document.querySelector("form");
// DOM form
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputsRadio = document.querySelectorAll("input[type=radio]");
const inputTermOfUse = document.getElementById("checkbox1");
// DOM confirmation
const modalConfirmation = document.getElementById("confirmation");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// dismiss modal event
modalClose.forEach(btn => btn.addEventListener("click", dismissModal));
// submit form event
form.addEventListener("submit", formSubmit);

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
    form.style.display = "block";
    modalConfirmation.style.display = "none";
}

// dismiss modal form
function dismissModal() {
    modalbg.style.display = "none";
}

// submit form
function formSubmit(event) {
    // avoid refresh page for each submit
    event.preventDefault();
    if (inputsAreValid()) {
        // display confirmation modal
        displayConfirmationMessage();
    }
}

// Check each inputs
function inputsAreValid() {
    console.log(`first:${inputFirst.value} - isAlpha:${isAlpha(inputFirst)}`);
    console.log(`last:${inputLast.value} - isAlpha:${isAlpha(inputLast)}`);
    console.log(`email:${inputEmail.value} - emailIsValid:${emailIsValid(inputEmail)}`);
    console.log(`birthdate:${inputBirthdate.value} - birthdateIsValid:${birthdateIsValid(inputBirthdate)}`);
    console.log(`quantity:${inputQuantity.value} - isNumber:${isNumber(inputQuantity)}`);
    console.log("inputTermOfUse.checked:", inputTermOfUse.checked);
    console.log("atLeastOneLocationIsChecked():", atLeastOneLocationIsChecked());

    return isAlpha(inputFirst) && isAlpha(inputLast) && emailIsValid(inputEmail) &&
        birthdateIsValid(inputBirthdate) && isNumber(inputQuantity) &&
        termsOfUseIsChecked() && atLeastOneLocationIsChecked();
}

// test if value contains only letters (a-zA-Z) and min 2 characters
function isAlpha(input) {
    const value = /^([a-zA-Z]){2,}$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test email with regular expression from Wikipedia standard mail syntax
function emailIsValid(input) {
    const value = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test if birthdate is valid not exceed today
function birthdateIsValid(input) {
    const value = new Date(input.value) < new Date();
    displayErrorMessage(input, !value);
    return value;
}

// test if value contains at least one number
function isNumber(input) {
    const value = /^([0-9]){1,}$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test if at least one location is checked
function atLeastOneLocationIsChecked() {
    let isChecked = false;
    inputsRadio.forEach(input => {
        if (input.checked) {
            isChecked = true;
        }
    });
    displayErrorMessage(inputsRadio[0], !isChecked);
    return isChecked;
}

// test if term of use checkbox is checked
function termsOfUseIsChecked() {
    const value = inputTermOfUse.checked;
    console.log("inputTermOfUse:", inputTermOfUse);
    displayErrorMessage(inputTermOfUse, !value);
    return value;
}

// Display confirmation message
function displayConfirmationMessage() {
    form.style.display = "none";
    modalConfirmation.style.display = "flex";
}

// Display error message below input in fuction of value in param
function displayErrorMessage(input, value) {
    input.parentElement.setAttribute("data-error-visible", value);
}