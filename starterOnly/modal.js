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
const modalBtnClose = document.querySelectorAll(".close");
const modalBtnSubmit = document.querySelectorAll(".btn-submit");
// DOM form
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputsRadio = document.querySelectorAll("input[type=radio]");
const inputTermOfUse = document.getElementById("checkbox1");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// dismiss modal event
modalBtnClose.forEach(btn => btn.addEventListener("click", dismissModal));
// submit form event
modalBtnSubmit.forEach(btn => btn.addEventListener("click", formSubmit));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
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
        displayMessageConfirmation();
        console.log("submit ok");
    } else {
        console.log("submit false");
    }
}

// Check each inputs
function inputsAreValid() {
    console.log(`first:${inputFirst.value} - isAlpha:${isAlpha(inputFirst.value)}`);
    console.log(`email:${inputEmail.value} - emailIsValid:${emailIsValid(inputEmail.value)}`);
    console.log(`birthdate:${inputBirthdate.value} - birthdateIsValid:${birthdateIsValid(inputBirthdate.value)}`);
    return isAlpha(inputFirst.value) && isAlpha(inputLast.value) && emailIsValid(inputEmail.value) &&
        birthdateIsValid(inputBirthdate.value) && isNumber(inputQuantity.value) &&
        termsOfUseIsChecked() && atLeastOneLocationIsChecked();
}

// test if value contains only letters (a-zA-Z) and min 2 characters
function isAlpha(value) {
    return /^([a-zA-Z]){2,}$/.test(value);
}

// test email with regular expression from Wikipedia standard mail syntax
function emailIsValid(email) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
}

// test if birthdate is valid not exceed today
function birthdateIsValid(value) {
    return new Date(value) < new Date();
}

// test if value contains at least one number
function isNumber(value) {
    return /^([0-9]){1,}$/.test(value);
}

// test if at least one location is checked
function atLeastOneLocationIsChecked() {
    let isChecked = false;
    inputsRadio.forEach(input => {
        console.log(`input.checked:${input.checked}`);
        if (input.checked) {
            isChecked = true;
        }
    });
    return isChecked;
}

function termsOfUseIsChecked() {
    console.log(`inputTermOfUse.checked:${inputTermOfUse.checked}`);
    return inputTermOfUse.checked;
}

function displayMessageConfirmation() {
    // TODO display main message
    // change button footer with 'fermer' to close modal
    // Keep X button to close modal also
}