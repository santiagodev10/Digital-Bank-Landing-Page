const hamMenu = document.querySelector('.ham-menu');
const menu = document.querySelector('.nav-header--nav-links');
const backdrop = document.querySelector('.nav-header--backdrop');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

function toggleMenu() {
    hamMenu.classList.toggle('change');
    menu.classList.toggle('inactive');
    menu.classList.toggle('nav-links_show');
    backdrop.classList.toggle('remove');
    backdrop.classList.toggle('backdrop_overlay');
    backdrop.setAttribute('aria-hidden', backdrop.classList.contains('remove') ? 'true' : 'false');

    // Block or unblock access via keyboard to main content and footer when menu is open
    if (backdrop.classList.contains('backdrop_overlay')) {
        main.inert = true;
        footer.inert = true;
    } else {
        main.inert = false;
        footer.inert = false;
    }
}

hamMenu.addEventListener('click', toggleMenu);

hamMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        toggleMenu();
    }
});

// Close menu when clicking outside
backdrop.addEventListener('click', () => {
    hamMenu.classList.remove('change');
    menu.classList.add('inactive');
    menu.classList.remove('nav-links_show');
    backdrop.classList.add('remove');
    backdrop.classList.remove('backdrop_overlay');
    backdrop.setAttribute('aria-hidden', 'true');
});