export function initializeGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let player = { x: 180, y: 360, width: 50, height: 20, speed: 12 };
    let books = [];
    let score = 0;
    let lives = 3;
    let gameRunning = false;
    let spawnInterval;

    function spawnBook() {
        const x = Math.random() * (canvas.width - 50);
        const genres = ['Fiction', 'Science', 'History', 'Fantasy', 'Mystery'];
        const genre = genres[Math.floor(Math.random() * genres.length)];
        books.push({ x, y: 0, width: 50, height: 20, speed: 2, genre });
    }

    function draw() {
        if (!gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#692be0';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        ctx.fillStyle = '#f31260';
        books.forEach(book => {
            ctx.fillRect(book.x, book.y, book.width, book.height);
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Roboto';
            ctx.fillText(book.genre, book.x, book.y + 15);
            ctx.fillStyle = '#f31260';
            book.y += book.speed;
        });

        books = books.filter(book => {
            if (book.y + book.height > canvas.height) {
                lives -= 1;
                if (lives <= 0) {
                    endGame();
                }
                return false;
            }
            if (
                book.y + book.height > player.y &&
                book.x + book.width > player.x &&
                book.x < player.x + player.width
            ) {
                score += 10;
                return false;
            }
            return true;
        });

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '20px Roboto';
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText(`Lives: ${lives}`, 10, 60);

        requestAnimationFrame(draw);
    }

    function startGame() {
        gameRunning = true;
        score = 0;
        lives = 3;
        books = [];
        document.getElementById('book-grid').style.display = 'none';
        document.getElementById('game-section').classList.remove('hidden');
        document.getElementById('content-header').textContent = 'Book Catcher Game';
        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawnBook, 1000);
        draw();
    }

    function endGame() {
        gameRunning = false;
        clearInterval(spawnInterval);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '30px Roboto';
        ctx.fillText(`Game Over! Score: ${score}`, canvas.width / 2.5 - 100, canvas.height / 2);
    }

    document.getElementById('game-link').addEventListener('click', (e) => {
        e.preventDefault();
        startGame();
    });

    document.getElementById('mobile-game-link').addEventListener('click', (e) => {
        e.preventDefault();
        startGame();
    });

    document.getElementById('restart-game').addEventListener('click', () => {
        startGame();
    });

    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        if (e.key === 'ArrowLeft' && player.x > 0) {
            player.x -= player.speed;
        } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    });
}