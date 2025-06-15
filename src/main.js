const domElements = {
    hamMenu: document.querySelector('.ham-menu'),
    menu: document.querySelector('.nav-header--nav-links'),
    backdrop: document.querySelector('.nav-header--backdrop'),
    header: document.querySelector('header'),
    main: document.querySelector('main'),
    footer: document.querySelector('footer'),
};

function toggleMenuClasses() {
    domElements.hamMenu.classList.toggle('change');
    domElements.menu.classList.toggle('inactive');
    domElements.menu.classList.toggle('nav-links_show');
    domElements.backdrop.classList.toggle('remove');
    domElements.backdrop.classList.toggle('backdrop_overlay');
}

function updateBackdropAccessibility() {
    domElements.backdrop.setAttribute('aria-hidden', domElements.backdrop.classList.contains('remove') ? 'true' : 'false');
}

function toggleMenu() {
    toggleMenuClasses();
    updateBackdropAccessibility();
    handleKeyboardAccess();
}

// Block or unblock access to interactive elements via keyboard to main content and footer when ham menu is open
function handleKeyboardAccess() {
    if (domElements.backdrop.classList.contains('backdrop_overlay')) {
        domElements.main.inert = true; 
        domElements.footer.inert = true;
    } else {
        domElements.main.inert = false;
        domElements.footer.inert = false;
    }
    //inert attribute is used to block access to interactive elements via keyboard
}

function closeMenu() {
    domElements.hamMenu.classList.remove('change');
    domElements.menu.classList.add('inactive');
    domElements.menu.classList.remove('nav-links_show');
    domElements.backdrop.classList.add('remove');
    domElements.backdrop.classList.remove('backdrop_overlay');
    domElements.backdrop.setAttribute('aria-hidden', 'true');
    domElements.main.inert = false;
    domElements.footer.inert = false;
}

function createScrollToTopButton() {
    const scrollToTopButton = document.createElement('button');
    const buttonImage = document.createElement('img');
    buttonImage.src = '../src/images/arrow-up.png';
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

    return scrollToTopButton;
}

const scrollToTop = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        if (entry.isIntersecting) {
            if (scrollToTopButton) {
                scrollToTopButton.remove();
            }
        } else {
            if (!scrollToTopButton) {
                const button = createScrollToTopButton();
                domElements.main.appendChild(button);
            }
        }
    });
});

domElements.hamMenu.addEventListener('click', toggleMenu);

domElements.hamMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        toggleMenu();
    }
});

domElements.backdrop.addEventListener('click', closeMenu);

scrollToTop.observe(domElements.header);