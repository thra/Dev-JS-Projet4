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


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// dismiss modal event
modalBtnClose.forEach(btn => btn.addEventListener("click", dismissModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// dismiss modal form
function dismissModal() {
    modalbg.style.display = "none";
}