document.addEventListener("DOMContentLoaded", () => {

const PASSWORD = "arya";

/* ELEMENTS */
const passwordScreen = document.getElementById("password-screen");
const bookArea = document.getElementById("book-area");
const unlockBtn = document.getElementById("unlock-btn");
const passwordInput = document.getElementById("password-input");
const errorMsg = document.getElementById("error-msg");

const pages = document.querySelectorAll(".page");
const cover = document.getElementById("cover");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentPage = 0;

/* ---------------------- */
/* PAGE CONTROL FUNCTION  */
/* ---------------------- */

function showPage(index) {

    // Prevent overflow
    if (index < 0 || index >= pages.length) return;

    // Hide all pages
    pages.forEach(page => {
        page.style.display = "none";
        page.classList.remove("slide-in");
    });

    // Show selected page
    pages[index].style.display = "block";
    pages[index].scrollTop = 0; // Reset scroll position
    pages[index].classList.add("slide-in");

    currentPage = index;

    updateButtons();
}

/* ---------------------- */
/* BUTTON STATE CONTROL   */
/* ---------------------- */

function updateButtons() {

    // Disable Previous on first page
    prevBtn.disabled = (currentPage === 0);

    // Disable Next on last page
    nextBtn.disabled = (currentPage === pages.length - 1);

    // Optional: reduce opacity when disabled
    prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
}

/* ---------------------- */
/* UNLOCK LOGIC           */
/* ---------------------- */

unlockBtn.addEventListener("click", () => {

    if (passwordInput.value.trim() === PASSWORD) {
        passwordScreen.style.display = "none";
        bookArea.classList.remove("hidden");
        showPage(0);
    } else {
        errorMsg.innerText = "Wrong password";
    }
});

/* Press Enter to unlock */
passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") unlockBtn.click();
});

/* ---------------------- */
/* COVER CLICK            */
/* ---------------------- */

cover.addEventListener("click", () => {
    showPage(1);
});

/* ---------------------- */
/* NAVIGATION BUTTONS     */
/* ---------------------- */

nextBtn.addEventListener("click", () => {
    showPage(currentPage + 1);
});

prevBtn.addEventListener("click", () => {
    showPage(currentPage - 1);
});

/* ---------------------- */
/* KEYBOARD NAVIGATION    */
/* ---------------------- */

document.addEventListener("keydown", (e) => {

    if (passwordScreen.style.display !== "none") return;

    if (e.key === "ArrowRight") {
        showPage(currentPage + 1);
    }

    if (e.key === "ArrowLeft") {
        showPage(currentPage - 1);
    }
});

/* ---------------------- */
/* SWIPE SUPPORT (MOBILE) */
/* ---------------------- */

let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    if (passwordScreen.style.display !== "none") return;

    if (startX - endX > 60) {
        showPage(currentPage + 1);
    }

    if (endX - startX > 60) {
        showPage(currentPage - 1);
    }
});

/* ---------------------- */
/* INITIAL STATE          */
/* ---------------------- */

updateButtons();

});
