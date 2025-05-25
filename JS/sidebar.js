import { fetchBooks } from './fetchBooks.js';

export function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const sortFilter = document.getElementById('sort-filter');
    const applyFilters = document.getElementById('apply-filters');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    priceFilter.addEventListener('input', () => {
        priceValue.textContent = `$${priceFilter.value}`;
    });

    applyFilters.addEventListener('click', async () => {
        const maxPrice = parseInt(priceFilter.value);
        const sortBy = sortFilter.value;
        const bookGrid = document.getElementById('book-grid');
        bookGrid.innerHTML = '<p class="text-gray-400 text-center">Filtering...</p>';

        const books = await fetchBooks();
        let filteredBooks = [];

        Object.values(books).forEach(categoryBooks => {
            filteredBooks.push(...categoryBooks);
        });

        filteredBooks = filteredBooks.filter(book => book.price <= maxPrice);

        filteredBooks.sort((a, b) => {
            if (sortBy === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'title-desc') {
                return b.title.localeCompare(b.title);
            } else if (sortBy === 'price-asc') {
                return a.price - b.price;
            } else if (sortBy === 'price-desc') {
                return b.price - a.price;
            }
            return 0;
        });

        bookGrid.innerHTML = '';
        if (filteredBooks.length === 0) {
            bookGrid.innerHTML = '<p class="text-gray-400 text-center">No books match your filters.</p>';
        } else {
            filteredBooks.forEach(book => {
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

        document.getElementById('content-header').textContent = 'Filtered Books';
        sidebar.classList.remove('open');
    });
}