const { inputFirst, inputLast, inputEmail, inputBirthdate, inputQuantity, inputsRadio, inputTermOfUse } = require('./domLinker')
const domLinker = require('./domLinker')

/**
 * Toggle class responsive nav
 */
const editNav = () => {
  if (domLinker.myTopNav.className === 'topnav') {
    domLinker.myTopNav.className += ' responsive'
  } else {
    domLinker.myTopNav.className = 'topnav'
  }
}

/**
 * Launch modal form
 */
const launchModal = () => {
  domLinker.modalbg.style.display = 'block'
  domLinker.form.style.display = 'block'
  domLinker.modalConfirmation.style.display = 'none'
}

/**
 * dismiss modal form
 */
// eslint-disable-next-line no-return-assign
const dismissModal = () => domLinker.modalbg.style.display = 'none'

/**
 * Submit form
 * @param {*} event
 */
const formSubmit = event => {
  // avoid refresh page for each submit
  event.preventDefault()
  if (inputsAreValid()) {
    displayConfirmationMessage()
  }
}

/**
 * test if value contains only letters (a-zA-Z) and min 2 characters
 * @param {String} value
 * @returns Boolean
 */
const isAlpha = value => /^([a-zA-Z]){2,}$/.test(value)

// eslint-disable-next-line no-useless-escape
const isEmail = value => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(value)

/**
 * test if input value contains at least one number
 * @param {*} value
 * @returns
 */
const isNumber = value => /^([0-9]){1,}$/.test(value)

const dateNotExceedToday = value => new Date(value) < new Date()

/**
 * Display message error or not under input element in function of value
 * Return value
 *
 * @param {HTMLElement} input
 * @param {Any} value
 * @returns Boolean
 */
const isErrorMessageDisplayed = (input, value) => {
  console.log(input.value, value)
  input.parentNode.setAttribute('data-error-visible', !value)
  return value
}

// event click toggle responsive nav class
domLinker.editNavIcon.addEventListener('click', editNav)
// event click launch modal event
domLinker.modalBtn.forEach(btn => btn.addEventListener('click', launchModal))
// event click dismiss modal event
domLinker.modalClose.forEach(btn => btn.addEventListener('click', dismissModal))
// event submit form event
domLinker.form.addEventListener('submit', formSubmit)

/**
 * test if at least one location is checked
 * @returns {Boolean}
 */
const atLeastOneLocationIsChecked = () => {
  let isChecked = false
  inputsRadio.forEach(input => {
    if (input.checked) {
      isChecked = true
    }
  })
  return isChecked
}

/* All methods to check validity for each input */
const firstNameIsValid = () => isErrorMessageDisplayed(inputFirst, isAlpha(inputFirst.value))
const lastNameIsValid = () => isErrorMessageDisplayed(inputLast, isAlpha(inputLast.value))
const emailIsValid = () => isErrorMessageDisplayed(inputEmail, isEmail(inputEmail.value))
const birthdateIsValid = () => isErrorMessageDisplayed(inputBirthdate, dateNotExceedToday(inputBirthdate.value))
const isQuantityValid = () => isErrorMessageDisplayed(inputQuantity, isNumber(inputQuantity.value))
const atLeastOneTournamentIsChecked = () => isErrorMessageDisplayed(inputsRadio[0], atLeastOneLocationIsChecked())
const termsOfUseIsChecked = () => isErrorMessageDisplayed(inputTermOfUse, inputTermOfUse.checked)

/* Add event 'input' for each input of the form and bind a method to check input validity */
inputFirst.addEventListener('input', firstNameIsValid)
inputLast.addEventListener('input', lastNameIsValid)
inputEmail.addEventListener('input', emailIsValid)
inputBirthdate.addEventListener('input', birthdateIsValid)
inputQuantity.addEventListener('input', isQuantityValid)

/**
 * Check validity of all inputs
 * @returns {Boolean}
 */
const inputsAreValid = () => firstNameIsValid() && lastNameIsValid() && emailIsValid() &&
  birthdateIsValid() && isQuantityValid() && atLeastOneTournamentIsChecked() && termsOfUseIsChecked()

/**
 * Display confirmation message
 */
const displayConfirmationMessage = () => {
  domLinker.form.style.display = 'none'
  domLinker.modalConfirmation.style.display = 'flex'
}
