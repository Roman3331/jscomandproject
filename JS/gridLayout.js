export function initializeGridLayout() {
    function updateGridLayout() {
        const width = window.innerWidth;
        const bookGrid = document.getElementById('book-grid');
        if (width >= 1200) {
            bookGrid.className = 'grid grid-cols-4 gap-4 p-4';
        } else if (width >= 992) {
            bookGrid.className = 'grid grid-cols-3 gap-4 p-4';
        } else if (width >= 768) {
            bookGrid.className = 'grid grid-cols-2 gap-4 p-4';
        } else if (width >= 576) {
            bookGrid.className = 'grid grid-cols-2 gap-2 p-2';
        } else {
            bookGrid.className = 'grid grid-cols-1 gap-2 p-2';
        }
    }

    window.addEventListener('resize', updateGridLayout);
    updateGridLayout();
}