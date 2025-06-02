const hamMenu = document.querySelector('.ham-menu');
const menu = document.querySelector('.nav-header--nav-links');
const backdrop = document.querySelector('.nav-header--backdrop');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('change');
    menu.classList.toggle('inactive');
    menu.classList.toggle('nav-links_show');
    backdrop.classList.toggle('remove');
    backdrop.classList.toggle('backdrop_overlay');
});

// Close menu when clicking outside
backdrop.addEventListener('click', () => {
    hamMenu.classList.remove('change');
    menu.classList.add('inactive');
    menu.classList.remove('nav-links_show');
    backdrop.classList.add('remove');
    backdrop.classList.remove('backdrop_overlay');
});