const hamMenu = document.querySelector('.ham-menu');
const menu = document.querySelector('.nav-header--nav-links');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('change');
    menu.classList.toggle('inactive');
    menu.classList.toggle('nav-links_show');
});