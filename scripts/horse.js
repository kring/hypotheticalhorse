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

addEventListener('click', function(event) {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    neigh.play();
}, false);

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