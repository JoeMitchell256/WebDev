var pulse_function = window.prompt("Please enter a pulse function (4 values (0 or 1) from 0 to 2pi): ");
var n = window.prompt("Please enter a value of n: ");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var i;
for(i = 0; i < 360; i+=10){
  ctx.moveTo(i+5,180);
  ctx.lineTo(i,180);
}
ctx.stroke();
var counter = 0, x = 0, y = 180;

//100 iterations
var increase = 90/180*Math.PI / 9;
for(i = 0; i <= 180; i += 10){
  ctx.moveTo(x,y);
  x = i;
  y = 180 - Math.sin(counter);
  counter += increase;
  ctx.lineTo(x,y);
}
ctx.stroke();
