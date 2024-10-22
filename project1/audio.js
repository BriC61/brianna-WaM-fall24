console.log("loaded audio.js");

const audioSrc = document.getElementById('audio-src');
const audioBtn = document.getElementById('audio-btn');
let isPlaying = false;

function togglePlayPause(){
    if (isPlaying == false){
        isPlaying = true;
        audioSrc.play();
        audioBtn.innerText = 'PAUSE';
        
    } else if (isPlaying == true) {
        audioSrc.pause();
        audioBtn.innerText = 'PLAY';
        isPlaying = false;
    }
}
audioBtn.addEventListener('click', togglePlayPause);
console.log(isPlaying);