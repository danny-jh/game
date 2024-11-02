const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -12,
    velocity: 0
};

let pipes = [];
let frameCount = 0;
let gameOver = false;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function addPipe() {
    const top = Math.random() * (canvas.height - 200);
    const bottom = canvas.height - top - 150;
    pipes.push({
        x: canvas.width,
        width: 20,
        top: top,
        bottom: bottom
    });
}

function update() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();

        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.height >= canvas.height || bird.y < 0) {
            gameOver = true;
        }

        pipes.forEach(pipe => {
            pipe.x -= 2;

            if (pipe.x + pipe.width < 0) {
                pipes.shift();
            }

            if (
                bird.x < pipe.x + pipe.width &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
            ) {
                gameOver = true;
            }
        });

        if (frameCount % 75 === 0) {
            addPipe();
        }
        frameCount++;
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 100, canvas.height / 2);
    }
}

function flap() {
    bird.velocity = bird.lift;
}

canvas.addEventListener('click', flap);
setInterval(update, 1000 / 60);
