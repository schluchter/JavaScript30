const sounds = {};
const keys = {};

// Add sounds into hashtable for quick lookup
for (const audio of document.querySelectorAll('audio')) {
    sounds[audio.dataset.key] = audio;
}

// Add key <div>s into hashtable for quick lookup
// and attach event listeners for the end of the visual transition
for (const keyDiv of document.querySelectorAll('.key[data-key]')) {
    keys[keyDiv.dataset.key] = keyDiv;
    keyDiv.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') {
            return;
        }
        keyDiv.classList.remove('playing');
    })
}

window.addEventListener('keydown', (event) => {
    // prevent errors when keys are pressed that aren't mapped to sounds
    if (!keys.hasOwnProperty(event.keyCode)) {
        return;
    }
    playSound(event.keyCode);
    flashKey(event.keyCode);
});

function playSound(keyCode) {
    sounds[keyCode].play()
    .then( () => {
        // enable the sound to be re-triggered before it has finished playing
        sounds[keyCode].currentTime = 0
    });
}

function flashKey(keyCode) {
    keys[keyCode].classList.add('playing');
}