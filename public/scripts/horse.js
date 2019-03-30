addEventListener('mousemove', function(event) {
    moveTo(event.clientX, event.clientY)
}, false);

addEventListener('touchmove', function(event) {
    const touches = event.touches;
    const touch = touches[0];
    moveTo(touch.clientX, touch.clientY)
    event.stopPropagation();
}, false);

function moveTo(x, y) {
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