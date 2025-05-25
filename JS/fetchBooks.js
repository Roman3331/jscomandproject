let cachedBooks = null;

export async function fetchBooks() {
    if (cachedBooks) return cachedBooks;
    try {
        const response = await fetch('books.json');
        if (!response.ok) {
            throw new Error('Failed to fetch books.json');
        }
        cachedBooks = await response.json();
        return cachedBooks;
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('book-grid').innerHTML = '<p class="text-red-400 text-center">Failed to load books. Please try again later.</p>';
        return {};
    }
}