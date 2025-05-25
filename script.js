import { displayBooks } from './JS/displayBooks.js';
import { initializeSidebar } from './JS/sidebar.js';
import { initializeSearch } from './JS/search.js';
import { initializeGreeting } from './JS/greeting.js';
import { initializeCategoryLinks } from './JS/categoryLinks.js';
import { initializeMobileMenu } from './JS/mobileMenu.js';
import { initializeGame } from './JS/game.js';
import { initializeGridLayout } from './JS/gridLayout.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeGridLayout();
    displayBooks();
    initializeSidebar();
    initializeSearch();
    initializeGreeting();
    initializeCategoryLinks();
    initializeMobileMenu();
    initializeGame();
});