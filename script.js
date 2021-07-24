var pulse_function = window.prompt("Please enter a pulse function (4 values (0 or 1) from 0 to 2pi): ");
var n = window.prompt("Please enter a value of n: ");

var c = document.getElementById("myCanvas");

c.position(300,300);

var ctx = c.getContext("2d");


ctx.lineWidth = 5;
ctx.strokeStyle = 'green';
ctx.strokeRect(100, 200, 150, 100);
