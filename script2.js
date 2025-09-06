
let audio;
function playAudio() {
    if (!audio) {
        audio = new Audio('musica/musica.mp3');
        audio.loop = true;
    }
    audio.play();
}