import { displayBooks } from './displayBooks.js';

export function initializeCategoryLinks() {
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            displayBooks(category);
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
}