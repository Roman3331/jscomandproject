export function initializeGreeting() {
    document.getElementById('greet-button').addEventListener('click', () => {
        const name = document.getElementById('user-name').value.trim();
        const greeting = document.getElementById('greeting');
        if (name) {
            greeting.textContent = `Hello, ${name}! Welcome to our bookstore!`;
            greeting.classList.remove('hidden');
            setTimeout(() => {
                greeting.classList.add('hidden');
            }, 3000);
        } else {
            greeting.textContent = 'Please enter your name!';
            greeting.classList.remove('hidden');
            setTimeout(() => {
                greeting.classList.add('hidden');
            }, 3000);
        }
    });
}