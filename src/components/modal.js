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
 *
 * @param {*} event
 */
const formSubmit = event => {
  // avoid refresh page for each submit
  event.preventDefault()
  if (inputsAreValid()) {
    // display confirmation modal
    displayConfirmationMessage()
  }
}

// event click toggle responsive class
domLinker.editNavIcon.addEventListener('click', editNav)
// event click launch modal event
domLinker.modalBtn.forEach(btn => btn.addEventListener('click', launchModal))
// event click dismiss modal event
domLinker.modalClose.forEach(btn => btn.addEventListener('click', dismissModal))
// event submit form event
domLinker.form.addEventListener('submit', formSubmit)

/**
 * Check validity for each inputs
 *
 * @returns {Boolean}
 */
const inputsAreValid = () => {
  console.log(`first:${domLinker.inputFirst.value} - isAlpha:${isAlpha(domLinker.inputFirst)}`)
  console.log(`last:${domLinker.inputLast.value} - isAlpha:${isAlpha(domLinker.inputLast)}`)
  console.log(`email:${domLinker.inputEmail.value} - emailIsValid:${emailIsValid(domLinker.inputEmail)}`)
  console.log(`birthdate:${domLinker.inputBirthdate.value} - birthdateIsValid:${birthdateIsValid(domLinker.inputBirthdate)}`)
  console.log(`quantity:${domLinker.inputQuantity.value} - isNumber:${isNumber(domLinker.inputQuantity)}`)
  console.log('inputTermOfUse.checked:', domLinker.inputTermOfUse.checked)
  console.log('atLeastOneLocationIsChecked():', atLeastOneLocationIsChecked())

  return isAlpha(domLinker.inputFirst) && isAlpha(domLinker.inputLast) && emailIsValid(domLinker.inputEmail) &&
        birthdateIsValid(domLinker.inputBirthdate) && isNumber(domLinker.inputQuantity) &&
        termsOfUseIsChecked() && atLeastOneLocationIsChecked()
}

/**
 * test if input value contains only letters (a-zA-Z) and min 2 characters
 *
 * @param {HTMLElement} input
 * @returns {Boolean}
 */
const isAlpha = input => {
  const value = /^([a-zA-Z]){2,}$/.test(input.value)
  displayErrorMessage(input, !value)
  return value
}

/**
 * test input email with regular expression from Wikipedia standard mail syntax
 *
 * @param {HTMLElement} input
 * @returns {Boolean}
 */
const emailIsValid = input => {
  // eslint-disable-next-line no-useless-escape
  const value = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(input.value)
  displayErrorMessage(input, !value)
  return value
}

/**
 * test if input birthdate is valid not exceed today
 *
 * @param {HTMLElement} input
 * @returns {Boolean}
 */
const birthdateIsValid = input => {
  const value = new Date(input.value) < new Date()
  displayErrorMessage(input, !value)
  return value
}

/**
 * test if input value contains at least one number
 *
 * @param {HTMLElement} input
 * @returns {Boolean}
 */
const isNumber = input => {
  const value = /^([0-9]){1,}$/.test(input.value)
  displayErrorMessage(input, !value)
  return value
}

/**
 * test if at least one location is checked
 *
 * @returns {Boolean}
 */
const atLeastOneLocationIsChecked = () => {
  let isChecked = false
  domLinker.inputsRadio.forEach(input => {
    if (input.checked) {
      isChecked = true
    }
  })
  displayErrorMessage(domLinker.inputsRadio[0], !isChecked)
  return isChecked
}

/**
 *  test if term of use checkbox is checked
 *
 * @returns {Boolean}
 */
const termsOfUseIsChecked = () => {
  const value = domLinker.inputTermOfUse.checked
  console.log('inputTermOfUse:', domLinker.inputTermOfUse)
  displayErrorMessage(domLinker.inputTermOfUse, !value)
  return value
}

/**
 * Display confirmation message
 */
const displayConfirmationMessage = () => {
  domLinker.form.style.display = 'none'
  domLinker.modalConfirmation.style.display = 'flex'
}

/**
 * Display error message below input in fuction of value in param
 *
 * @param {HTMLElement} input
 * @param {String} value
 * @returns
 */
const displayErrorMessage = (input, value) => input.parentElement.setAttribute('data-error-visible', value)
