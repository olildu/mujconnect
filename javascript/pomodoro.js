var runner = false;
var seconds = 1500;
var intervalId;
var element1 = document.getElementById('dropdown')
var outer = document.getElementById('blur')
var minutes = document.getElementById('minutes')

var mins

function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
}

function runTimer() {
    if (seconds >= 0 && runner) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        var displayTime = formatTime(minutes) + ":" + formatTime(remainingSeconds);
        document.getElementById('timer').textContent = displayTime;

        console.log(displayTime)

        seconds--;

        intervalId = setTimeout(runTimer, 1000);
    } else {
        console.log("Timer complete!");
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
    var status = document.getElementById('start-stop').textContent
    console.log(document.getElementById('start-stop').textContent)
    if(document.getElementById('start-stop').textContent == 'start'){
        document.getElementById('start-stop').textContent = 'stop'
    }
    else{
        document.getElementById('start-stop').textContent = 'start'
    }
}

function reset() {
    clearTimeout(intervalId);
    if (String(mins).length == 3){
        var if_0 = seconds / 60
        console.log(if_0)
        document.getElementById('timer').textContent = `${if_0}:00`;
    }
    if (String(mins).length == 1){
        document.getElementById('timer').textContent = `0${mins}:00`;
    }
    else{
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
    element1.style.animation = 'fadein 0.3s ease-in forwards';
}

function outside(){
    outer.style.display = 'none'
    element1.style.display = 'none'
    mins = parseInt(minutes.value)
    minutes.value = ''

    if (String(mins).length == 3){
        var if_0 = seconds / 60
        console.log(if_0)
        document.getElementById('timer').textContent = `${if_0}:00`;
    }
    if (String(mins).length == 1){
        document.getElementById('timer').textContent = `0${mins}:00`;
    }
    else{
        document.getElementById('timer').textContent = `${mins}:00`;
    }

    seconds = mins*60
}

function extend_navbar(){
    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')

    outer1.style.width = '100%'
    outer1.style.height = '100%'
    text_holder.style.left = '50%'
    left_bar.style.width = '70px'
    outer1.style.zIndex = '2'
}

document.getElementById("outer1").addEventListener("click", function() {

    var left_bar = document.getElementById('nav-bar')
    var text_holder = document.getElementById('text-holder')
    var outer1 = document.getElementById('outer1')

    console.log('Navbar collapsed');

    outer1.style.width = '0vh';
    outer1.style.height = '0vh';
    text_holder.style.left = '-20px';
    left_bar.style.width = '0px';
    outer1.style.zIndex = '-2';
  })