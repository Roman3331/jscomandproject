export function initializeMobileMenu() {
    document.getElementById('hamburger').addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });
}