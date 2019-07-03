const horseWidth = 380.5;
const horseHeight = 250;

addEventListener('mousemove', function(event) {
    moveTo(event.clientX, event.clientY)
}, false);

addEventListener('touchmove', function(event) {
    const touches = event.touches;
    const touch = touches[0];
    moveTo(touch.clientX, touch.clientY)
    event.stopPropagation();
}, false);

const horseNeighSound = 'sounds/Horse Neigh-SoundBible.com-1740540960.wav';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const neigh = document.getElementById('neigh');
const track = audioContext.createMediaElementSource(neigh);
track.connect(audioContext.destination);

const eatAudioContext = new AudioContext();
const eat = document.getElementById('eat');
const eatTrack = eatAudioContext.createMediaElementSource(eat);
eatTrack.connect(eatAudioContext.destination);

addEventListener('click', function(event) {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (eatAudioContext.state === 'suspended') {
        eatAudioContext.resume();
    }

    // play or pause track depending on state
    neigh.play();
    eat.play();
}, false);

let horseX;
let horseY;

function moveTo(x, y) {
    x -= horseWidth / 2;
    y -= horseHeight / 2;

    const page = document.getElementsByClassName('page')[0];
    const rect = page.getBoundingClientRect();

    if (x > rect.width - horseWidth) {
        x = rect.width - horseWidth;
    }

    if (x < 0) {
        x = 0;
    }

    if (y >= rect.height - horseHeight) {
        y = rect.height - horseHeight - 1;
    }

    if (y < 0) {
        y = 0;
    }

    horseX = x;
    horseY = y;

    const horse = document.getElementsByClassName('horse')[0];
    horse.style.left = x + 'px';
    horse.style.top = y + 'px';
}

const colors = [
    'pink',
    'blue',
    'green',
    'purple',
    'orange',
    'yellow',
    'red'
];

const backgrounds = [
    'images/rainbow-fairy.jpg',
    'images/dino1.jpg',
    'images/velociraptor.png',
    'images/star-fairy.png'
];

let currentColor = -1;
let currentImage = -1;

setInterval(function() {
    ++currentColor;
    if (currentColor >= colors.length) {
        currentColor = 0;
    }

    const color = colors[currentColor];
    const page = document.getElementsByClassName('page')[0];
    page.style['background-color'] = color;

    ++currentImage;
    if (currentImage >= backgrounds.length) {
        currentImage = 0;
    }

    const image = backgrounds[currentImage];
    page.style['background-image'] = `url(${image})`;
}, 5000);

const page = document.getElementsByClassName('page')[0];
const height = page.clientHeight;
const width = height * 10;

const levelWidth = width;
const startTime = performance.now();

const obstacles = [];
const obstacleDomElements = [];
const types = [];

let score = 0;
let lives = 3;

function createLevel() {
    function create(imageUrl, type) {
        const x = (width - 150) * Math.random() - height * 10;
        const y = (height - 158) * Math.random();

        const obstacle = document.createElement("div");
        obstacle.className = "obstacle";
        obstacle.style.left = x + 'px';
        obstacle.style.top = y + 'px';

        const image = document.createElement("img");
        image.src = imageUrl;
        image.width = 150;
        obstacle.appendChild(image);

        obstacleDomElements.push(obstacle);
        obstacles.push([x, y]);
        types.push(type);

        page.appendChild(obstacle);
    }

    const numberOfObstacles = 10;
    for (let i = 0; i < numberOfObstacles; ++i) {
        create("images/moon-small.png", "obstacle");
    }

    const numberOfFood = 10;
    for (let i = 0; i < numberOfFood; ++i) {
        create("images/Squid-PNG-Transparent-Background.png", "food");
    }

    const numberOfLives = 5;
    for (let i = 0; i < numberOfLives; ++i) {
        create("images/bike.png", "life");
    }
}

createLevel();

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = "SCORE: " + score;
}

function updateLives() {
    const element = document.getElementById('lives');
    element.innerText = "LIVES: " + lives;
}

updateScore();
updateLives();

function run() {
    const currentTime = performance.now() - startTime;
    const currentLevelPosition = (currentTime / 1.10) % (levelWidth + page.clientWidth);

    const buffer = 40;

    const horseRectangle = {
        minX: horseX + buffer,
        minY: horseY + buffer,
        maxX: horseX + horseWidth - buffer,
        maxY: horseY + horseHeight - buffer
    };

    for (let i = 0; i < obstacles.length; ++i) {
        const obstacle = obstacles[i];
        if (!obstacle) {
            continue;
        }
        const domElement = obstacleDomElements[i];
        const newPosition = obstacle[0] + currentLevelPosition;
        domElement.style.left = newPosition + "px";

        const obstacleRectangle = {
            minX: newPosition + buffer,
            minY: obstacle[1] + buffer,
            maxX: newPosition + 150 - buffer,
            maxY: obstacle[1] + 157 - buffer
        };

        const intersection = {
            minX: Math.max(obstacleRectangle.minX, horseRectangle.minX),
            maxX: Math.min(obstacleRectangle.maxX, horseRectangle.maxX),
            minY: Math.max(obstacleRectangle.minY, horseRectangle.minY),
            maxY: Math.min(obstacleRectangle.maxY, horseRectangle.maxY)
        };

        if (intersection.minX < intersection.maxX && intersection.minY < intersection.maxY) {
            // Collision!
            if (types[i] === "food") {
                eat.play();
                domElement.parentElement.removeChild(domElement);
                obstacles[i] = undefined;
                score = score + 10;
                updateScore();
            } else if (types[i] === "obstacle") {
                neigh.play();
            } else if (types[i] === "life") {
                domElement.parentElement.removeChild(domElement);
                obstacles[i] = undefined;
                ++lives;
                updateLives();
            }
        }
    }
    
    requestAnimationFrame(run);
}

requestAnimationFrame(run);