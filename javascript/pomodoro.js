var runner = false;
var seconds = 1500;
var intervalId;
var element1 = document.getElementById('dropdown')
var outer = document.getElementById('blur')
const ring = new Audio('/audio/ring.mp3')
var mins = 25
var prev_min = 1500
function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
}

function runTimer() {
    if (seconds >= 0 && runner) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        var displayTime = formatTime(minutes) + ":" + formatTime(remainingSeconds);
        document.getElementById('timer').textContent = displayTime;

        seconds--;

        intervalId = setTimeout(runTimer, 1000);
    }
    else{
        runner = false
        document.getElementById('start-stop').textContent = 'start'
        ring.play();
    }
}

function run_check() {
    if (runner) {
        runner = false;
        clearTimeout(intervalId);
    } else {
        runner = true;
        runTimer();
    }
    if(document.getElementById('start-stop').textContent == 'start'){
        document.getElementById('start-stop').textContent = 'stop'
    }
    else{
        document.getElementById('start-stop').textContent = 'start'
    }
}

function reset() {
    clearTimeout(intervalId);
    
    seconds = mins * 60

    if (mins == undefined){
        var if_0 = seconds / 60
        console.log(if_0)
        document.getElementById('timer').textContent = `${if_0}:00`;
    }
    if (String(mins).length == 1){
        document.getElementById('timer').textContent = `0${mins}:00`;
    }
    if (String(mins).length == 2){
        document.getElementById('timer').textContent = `${mins}:00`;
    }
    runner = false;
}

function dropdown(){
    outer.style.zIndex = '2'
    outer.style.display = 'block'
    outer.style.animation = 'fadein 0.2s ease-in forwards';
    

    element1.style.zIndex = '3'
    element1.style.display = 'block'
    element1.style.animation = 'fadein 0.4s ease-in forwards';


}

function outside(){
    var minutes = document.getElementById('minutes')

    outer.style.display = 'none'
    element1.style.display = 'none'
    mins = parseInt(minutes.value)
    minutes.value = ''
    
    console.log(mins)


    if (Number.isNaN(mins)){
        console.log('None') 
        seconds = prev_min
        document.getElementById('timer').textContent = `${prev_min/60}:00`;

    }
    if (String(mins).length == 2){
        document.getElementById('timer').textContent = `${mins}:00`;
        seconds = mins*60
        prev_min = mins*60
        console.log(seconds)

    }
    if (String(mins).length == 1){
        document.getElementById('timer').textContent = `0${mins}:00`;
        seconds = mins*60
        prev_min = mins*60
        console.log(seconds)

    }


}

function extend_navbar(){
    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')
    var spotify_player = document.getElementById('spotify-player')

    spotify_player.style.opacity = '0'
    outer1.style.width = '100%'
    outer1.style.height = '100%'
    text_holder.style.left = '50%'
    left_bar.style.width = '70px'
    outer1.style.zIndex = '1'
}

document.getElementById("outer1").addEventListener("click", function() {

    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')
    var spotify_player = document.getElementById('spotify-player')

    console.log('Navbar collapsed');

    spotify_player.style.opacity = '0.5'
    outer1.style.width = '0vh';
    outer1.style.height = '0vh';
    text_holder.style.left = '-20px';
    left_bar.style.width = '0px';
    outer1.style.zIndex = '-2';
  })

var spotify_player = document.getElementById('spotify-player')

spotify_player.addEventListener('mouseover', () => {
    spotify_player.style.opacity = '1'
});

spotify_player.addEventListener('mouseout', () => {
    spotify_player.style.opacity = '0.5'
});
