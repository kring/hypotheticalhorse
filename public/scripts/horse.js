addEventListener('mousemove', function(event) {
    const horse = document.getElementsByClassName('horse')[0];
    horse.style.left = event.clientX + 'px';
    horse.style.top = event.clientY + 'px';
}, false);

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