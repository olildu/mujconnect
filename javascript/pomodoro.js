var runner = false;
var seconds = 1500;
var intervalId;
var element1 = document.getElementById('dropdown')
var outer = document.getElementById('blur')
const ring = new Audio('/audio/ring.mp3')
var mins = 25
var prev_min = 1500
var text_holder1 = document.getElementById('text-holder')


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
    var theme = document.getElementById('select-theme').value
    var background = document.body


    element1.style.animation = 'fadeout 0.4s ease-out forwards';
    outer.style.animation = 'fadeout 0.4s ease-out forwards';

    setTimeout(function(){
    outer.style.display = 'none'
    element1.style.display = 'none'
    },500)

    background.style.backgroundImage = `url('/images/${theme}.jpg')`

    mins = parseInt(minutes.value)
    minutes.value = ''

    if (Number.isNaN(mins)){
        seconds = prev_min
        document.getElementById('timer').textContent = `${prev_min/60}:00`;

    }
    if (String(mins).length == 2){
        document.getElementById('timer').textContent = `${mins}:00`;
        seconds = mins*60
        prev_min = mins*60
    }
    if (String(mins).length == 1){
        document.getElementById('timer').textContent = `0${mins}:00`;
        seconds = mins*60
        prev_min = mins*60
    }


}

function extend_navbar(){
    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')
    var spotify_player = document.getElementById('spotify-player')
    var logo = document.getElementById('logo-div')

    outer1.style.width = '100%'
    outer1.style.height = '100%'
    outer1.style.zIndex = '1'
    spotify_player.style.opacity = '0'
    text_holder.style.left = '34px'
    left_bar.style.width = '70px'
    logo.style.left = '2px'
}

document.getElementById("outer1").addEventListener("click", function() {

    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')
    var spotify_player = document.getElementById('spotify-player')
    var logo = document.getElementById('logo-div')

    spotify_player.style.opacity = '0.7'
    outer1.style.width = '0vh';
    outer1.style.height = '0vh';
    text_holder.style.left = '-20px';
    left_bar.style.width = '0px';
    outer1.style.zIndex = '-2';
    logo.style.left = '-60px'
  })

var spotify_player = document.getElementById('spotify-player')

spotify_player.addEventListener('mouseover', () => {
    spotify_player.style.opacity = '1'
});

spotify_player.addEventListener('mouseout', () => {
    spotify_player.style.opacity = '0.7'
});


function timer_f(){
    var general_children =  document.getElementById('general_class_children')
    var timer_children = document.getElementById('timer_class_children')
    var line = document.getElementById('line')

    general_children.style.animation = 'fadeout 0.2s ease-out forwards';

    setTimeout(dissaper,300)
    
    timer_children.style.animation = 'fadein 0.2s ease-in forwards';
    timer_children.style.display = 'block'
    line.style.opacity = '0'
    line.style.top = '130px'
    line.style.opacity = '1'
    line.style.widows = '55px'
}

function timer_f(){
    var general_children =  document.getElementById('general_class_children')
    var timer_children = document.getElementById('timer_class_children')
    var line = document.getElementById('line')

    general_children.style.animation = 'fadeout 0.2s ease-out forwards';

    setTimeout(function(){
        general_children.style.display = 'none'
    },300)
    
    timer_children.style.animation = 'fadein 0.2s ease-in forwards';
    timer_children.style.display = 'block'
    line.style.opacity = '0'
    line.style.top = '130px'
    line.style.opacity = '1'
    line.style.width = '55px'
}

function general_f(){
    var general_children =  document.getElementById('general_class_children')
    var timer_children = document.getElementById('timer_class_children')
    var line = document.getElementById('line')

    timer_children.style.animation = 'fadeout 0.2s ease-out forwards';

    setTimeout(function(){
        timer_children.style.display = 'none'
    },300)
    
    general_children.style.animation = 'fadein 0.2s ease-in forwards';
    general_children.style.display = 'block'
    line.style.opacity = '0'
    line.style.top = '87px'
    line.style.opacity = '1'
    line.style.width = '62px'
}
