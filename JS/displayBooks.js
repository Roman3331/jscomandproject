import { fetchBooks } from './fetchBooks.js';

export async function displayBooks(category = 'all') {
    const bookGrid = document.getElementById('book-grid');
    const gameSection = document.getElementById('game-section');
    bookGrid.style.display = 'grid';
    gameSection.classList.add('hidden');
    bookGrid.innerHTML = '<p class="text-gray-400 text-center">Loading...</p>';

    const books = await fetchBooks();
    let booksToShow = [];

    if (category === 'all') {
        Object.values(books).forEach(categoryBooks => {
            booksToShow.push(...categoryBooks);
        });
    } else {
        booksToShow = books[category] || [];
    }

    bookGrid.innerHTML = '';
    if (booksToShow.length === 0) {
        bookGrid.innerHTML = '<p class="text-gray-400 text-center">No books found in this category.</p>';
        return;
    }

    booksToShow.forEach(book => {
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

    document.getElementById('content-header').textContent = category === 'all' ? 'Browse Our Collection' : `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}