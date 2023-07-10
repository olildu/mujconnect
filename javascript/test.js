function extend_navbar(){
  var left_bar = document.getElementById('nav-bar')
  var text_holder = document.getElementById('text-holder')
  var outer1 = document.getElementById('outer1')

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

  outer1.style.width = '0vh';
  outer1.style.height = '0vh';
  text_holder.style.left = '-20px';
  left_bar.style.width = '0px';
  outer1.style.zIndex = '-2';
})