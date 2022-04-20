/* Inject css */
require("./modal.css");
const domLinker = require("./helpers/domLinker");

const editNav = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
};

// launch modal form
const launchModal = () => {
    domLinker.modalbg.style.display = "block";
    domLinker.form.style.display = "block";
    domLinker.modalConfirmation.style.display = "none";
}

// dismiss modal form
const dismissModal = () => domLinker.modalbg.style.display = "none";

// submit form
const formSubmit = event => {
    // avoid refresh page for each submit
    event.preventDefault();
    if (inputsAreValid()) {
        // display confirmation modal
        displayConfirmationMessage();
    }
}

domLinker.editNavIcon.addEventListener("click", editNav);
// launch modal event
domLinker.modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
// dismiss modal event
domLinker.modalClose.forEach(btn => btn.addEventListener("click", dismissModal));
// submit form event
domLinker.form.addEventListener("submit", formSubmit);


// Check each inputs
const inputsAreValid = () => {
    console.log(`first:${domLinker.inputFirst.value} - isAlpha:${isAlpha(domLinker.inputFirst)}`);
    console.log(`last:${domLinker.inputLast.value} - isAlpha:${isAlpha(domLinker.inputLast)}`);
    console.log(`email:${domLinker.inputEmail.value} - emailIsValid:${emailIsValid(domLinker.inputEmail)}`);
    console.log(`birthdate:${domLinker.inputBirthdate.value} - birthdateIsValid:${birthdateIsValid(domLinker.inputBirthdate)}`);
    console.log(`quantity:${domLinker.inputQuantity.value} - isNumber:${isNumber(domLinker.inputQuantity)}`);
    console.log("inputTermOfUse.checked:", domLinker.inputTermOfUse.checked);
    console.log("atLeastOneLocationIsChecked():", atLeastOneLocationIsChecked());

    return isAlpha(domLinker.inputFirst) && isAlpha(domLinker.inputLast) && emailIsValid(domLinker.inputEmail) &&
        birthdateIsValid(domLinker.inputBirthdate) && isNumber(domLinker.inputQuantity) &&
        termsOfUseIsChecked() && atLeastOneLocationIsChecked();
}

// test if value contains only letters (a-zA-Z) and min 2 characters
const isAlpha = input => {
    const value = /^([a-zA-Z]){2,}$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test email with regular expression from Wikipedia standard mail syntax
const emailIsValid = input => {
    const value = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test if birthdate is valid not exceed today
const birthdateIsValid = input => {
    const value = new Date(input.value) < new Date();
    displayErrorMessage(input, !value);
    return value;
}

// test if value contains at least one number
const isNumber = input => {
    const value = /^([0-9]){1,}$/.test(input.value);
    displayErrorMessage(input, !value);
    return value;
}

// test if at least one location is checked
const atLeastOneLocationIsChecked = () => {
    let isChecked = false;
    domLinker.inputsRadio.forEach(input => {
        if (input.checked) {
            isChecked = true;
        }
    });
    displayErrorMessage(domLinker.inputsRadio[0], !isChecked);
    return isChecked;
}

// test if term of use checkbox is checked
const termsOfUseIsChecked = () => {
    const value = domLinker.inputTermOfUse.checked;
    console.log("inputTermOfUse:", domLinker.inputTermOfUse);
    displayErrorMessage(domLinker.inputTermOfUse, !value);
    return value;
}

// Display confirmation message
const displayConfirmationMessage = () => {
    domLinker.form.style.display = "none";
    domLinker.modalConfirmation.style.display = "flex";
}

// Display error message below input in fuction of value in param
const displayErrorMessage = (input, value) => input.parentElement.setAttribute("data-error-visible", value);