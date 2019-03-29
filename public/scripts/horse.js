addEventListener('mousemove', function(event) {
    const horse = document.getElementsByClassName('horse')[0];
    horse.style.left = event.clientX + 'px';
    horse.style.top = event.clientY + 'px';
}, false);