const hamMenu = document.querySelector('.ham-menu');
const menu = document.querySelector('.nav-header--nav-links');
const backdrop = document.querySelector('.nav-header--backdrop');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

function toggleMenu() {
    hamMenu.classList.toggle('change');
    menu.classList.toggle('inactive');
    menu.classList.toggle('nav-links_show');
    backdrop.classList.toggle('remove');
    backdrop.classList.toggle('backdrop_overlay');
    backdrop.setAttribute('aria-hidden', backdrop.classList.contains('remove') ? 'true' : 'false');
    handleKeyboardAccess();
}

function handleKeyboardAccess() {
    // Block or unblock access to interactive elements via keyboard to main content and footer when menu is open
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
    main.inert = false;
    footer.inert = false;
});

// Scroll to top functionality
const scrollToTop = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('You are at the top of the page');
            const scrollToTopButton = document.querySelector('.scroll-to-top');
            if (scrollToTopButton) {
                scrollToTopButton.remove();
            }
        } else {
            console.log('You are not at the top of the page');
            const scrollToTopButton = document.createElement('button');
            const buttonImage = document.createElement('img');
            buttonImage.src = './images/arrow-up.png';
            buttonImage.alt = 'Scroll to top';
            buttonImage.classList.add('scroll-to-top-image');
            scrollToTopButton.appendChild(buttonImage);
            scrollToTopButton.classList.add('scroll-to-top');
            scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
            scrollToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            main.appendChild(scrollToTopButton);
            handleKeyboardAccess();
        }
    });
});

scrollToTop.observe(header);