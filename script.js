var pulse_function = window.prompt("Please enter a pulse function (4 values (0 or 1) from 0 to 2pi): ");
var n = window.prompt("Please enter a value of n: ");

function setup(){
  createCanvas(400,400);
  createElement('h1', 'Lucky Numbers');
}

function mousePressed(){
  createP("My lucky number is: " + random(0,10));  
}

function draw(){
  background(220);
  fill(255,0,0);
  rect(200,200,50,50);
}
