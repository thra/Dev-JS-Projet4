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
}