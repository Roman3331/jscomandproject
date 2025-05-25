import { fetchBooks } from './fetchBooks.js';

export function initializeSearch() {
    document.getElementById('search-button').addEventListener('click', async () => {
        const query = document.getElementById('search-bar').value.trim().toLowerCase();
        const bookGrid = document.getElementById('book-grid');
        const gameSection = document.getElementById('game-section');
        bookGrid.style.display = 'grid';
        gameSection.classList.add('hidden');
        bookGrid.innerHTML = '<p class="text-gray-400 text-center">Searching...</p>';

        const books = await fetchBooks();
        let results = [];

        Object.values(books).forEach(categoryBooks => {
            categoryBooks.forEach(book => {
                if (book.title.toLowerCase().includes(query) || book.description.toLowerCase().includes(query)) {
                    results.push(book);
                }
            });
        });

        bookGrid.innerHTML = '';
        if (results.length === 0) {
            bookGrid.innerHTML = '<p class="text-gray-400 text-center">No books found for your search.</p>';
        } else {
            results.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card bg-gray-800 p-4 rounded-lg shadow-lg';
                bookCard.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover rounded">
                    <h3 class="text-lg font-semibold mt-2 text-gray-100">${book.title}</h3>
                    <p class="text-gray-400">${book.description}</p>
                    <p class="text-gray-300 mt-2">$${book.price.toFixed(2)}</p>
                `;
                bookGrid.appendChild(bookCard);
            });
        }

        document.getElementById('content-header').textContent = query ? `Search Results for "${query}"` : 'Browse Our Collection';
    });
}