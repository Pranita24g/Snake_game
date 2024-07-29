const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let snake = [{x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160}, {x: 100, y: 160}];
let apple = {x: 320, y: 320};
let direction = 'RIGHT';
let changingDirection = false;

canvas.width = 400;
canvas.height = 400;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (hasGameEnded()) return;
    changingDirection = false;
    setTimeout(() => {
        clearCanvas();
        drawApple();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(snakePart => {
        ctx.fillStyle = '#00ff00';
        ctx.strokeStyle = '#000000';
        ctx.fillRect(snakePart.x, snakePart.y, grid, grid);
        ctx.strokeRect(snakePart.x, snakePart.y, grid, grid);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        generateApple();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -grid;
    const goingDown = dy === grid;
    const goingRight = dx === grid;
    const goingLeft = dx === -grid;

    if (keyPressed === 37 && !goingRight) {
        dx = -grid;
        dy = 0;
    }
    if (keyPressed === 38 && !goingDown) {
        dx = 0;
        dy = -grid;
    }
    if (keyPressed === 39 && !goingLeft) {
        dx = grid;
        dy = 0;
    }
    if (keyPressed === 40 && !goingUp) {
        dx = 0;
        dy = grid;
    }
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function drawApple() {
    ctx.fillStyle = '#ff0000';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(apple.x, apple.y, grid, grid);
    ctx.strokeRect(apple.x, apple.y, grid, grid);
}

function generateApple() {
    apple.x = Math.floor(Math.random() * canvas.width / grid) * grid;
    apple.y = Math.floor(Math.random() * canvas.height / grid) * grid;
}

let dx = grid;
let dy = 0;

generateApple();
gameLoop();
