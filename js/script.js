const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const container = document.querySelector('.container');

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    container.classList.toggle("open");
});