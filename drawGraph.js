function drawGraph(pulsefunction,c,ctx,n,xmin,xmax,fw,fc,sw,sc){//We need to know what attributes need to be passed to this function
  //Calculate the point value for the xmin and xmax inputs

  var i = 0;
  var pulsearray = pulsefunction.split(" ");//Take input as an array of values split on single space

  //In a for loop find the maximum/minimum value, use the absolute value so you'll only be using positive numbers as reference

  var max = -Infinity;

  for(i = 0; i < pulsearray.length; i++){
    if(Math.abs(parseInt(pulsearray[i])) > max){
      max = Math.abs(parseInt(pulsearray[i]));
    }
  }

  //By this point we should know our y scale. Whatever our max value is we should have that be our max positive/negative range. 
  //This might not work as I am expecting it to work, however thats alright we'll do it now, then change it later if so.

  <!-- End of input reading -->

  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");

  ctx.clearRect(0,0,1420,500);
  ctx.beginPath(); //Apparently we need this line???

      
  //We should probably draw the y and x axis here, so that we can properly scale the graph first...
  // I'd love to do this, but javascript wont let me...

  <!-- This is the start of the square wave -->
  <!-- Any state transitions will require 3 lines, not 2. -->
  <!-- pi/2 and 2pi/2 are tied to 5pi/2 and 6pi/2, and 9pi/2 and 10pi/2 -->

  <!-- Y-axis modular variables -->

  var ycenter = 250;
  var ytop = 50;
  var yend = 450;

  <!-- Y-axis modular variables end -->

  <!-- X-axis modular variables -->

  var xstart = 100;
  var xend = 1300;

  <!-- X-axis modular variables end -->

  this.drawGridlines(ytop,yend,xstart,xend); //This function should take 4 parameters
      
  //var interval = this.drawGridlines(ctx,xstart,xend,ytop,yend,i,pulsearray,n,ycenter,ytop);
  //twopi = interval*2; //Two pi should be defined by the interval calculated in drawGridlines

  //ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';

  <!-- End of Y-axis creation -->

  <!-- Draw new axis for both graphs -->

  <!-- New x-axis -->

  ctx.moveTo(xstart-50,ycenter);
  ctx.lineTo(xend,ycenter); <!-- The total x-axis distance is from 1400-50 = 1350. If we want 3 periods we want to to take intervals of 1350/3 = 450 -->
  ctx.stroke();

  <!-- End new x-axis -->

  var twopi = interval*2;


  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';

  // X-axis Line
  ctx.moveTo(xstart-50,ycenter);
  ctx.lineTo(xend,ycenter); <!-- The total x-axis distance is from 1400-50 = 1350. If we want 3 periods we want to to take intervals of 1350/3 = 450 -->

  // X-axis title
  ctx.fillText("t/T",(xstart + xend)/2,yend + 100);

  ctx.stroke();



  //this.drawXaxis(ctx,xstart,yend,xend,twopi,ycenter,i);


  //this.drawYaxis(ctx,xstart,ytop,yend,ycenter,max,i,xend);


  var xpos = 0;

  if(xMin >= 1 && xMax >= 1){
    xpos = xstart;
  }else if(xMin <= -1 && xMax <= -1){
    xpos = xend;
  }else{
    xpos = xstart;
  }

  ctx.moveTo(xpos,ytop);
  ctx.lineTo(xpos,yend); <!-- This needs to be placed based on the x limits provided by the user... -->

  ctx.stroke();//I just want to color the line that is the y axis...

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';

  // Y-axis scale and y-axis gridlines...
  var yScalePos = 0;
  for(i = -max; i < max+1; i++){ //Can I draw the x-scale here as well?
    yScalePos = ( ( (ycenter-ytop)/(0-parseInt(max)) ) * i ) + ycenter;
    if(xMin >= 1 && xMax >= 1){
      if(i >= 0){//This shift should be modulated based on the x limits
        ctx.fillText(i, xpos - 30, yScalePos);//Further shift the y scale off of the y axis for visibility
      }else{
        ctx.fillText(i, xpos - 50, yScalePos);//Further shift the y scale off of the y axis for visibility
      }
    }else if(xMin <= -1 && xMax <= -1){//Shift y scale to the right
      if(i >= 0){//This shift should be modulated based on the x limits
        ctx.fillText(i, xpos + 15, yScalePos);//Further shift the y scale off of the y axis for visibility
      }else{
        ctx.fillText(i, xpos + 25, yScalePos);//Further shift the y scale off of the y axis for visibility
      }
    }else{//In case of case 3, draw the y scale on the right side of the graph
      if(i >= 0){//This shift should be modulated based on the x limits
        ctx.fillText(i, xpos - 30, yScalePos);//Further shift the y scale off of the y axis for visibility
      }else{
        ctx.fillText(i, xpos - 50, yScalePos);//Further shift the y scale off of the y axis for visibility
      }
    }
    ctx.moveTo(xstart,yScalePos);
    ctx.lineTo(xend,yScalePos);
    ctx.stroke();
  }
  // Y-axis title
  if(xMin >= 1 && xMax >= 1){
    ctx.fillText("f(t)",xpos - 85,ycenter - 20);
  }else if(xMin <= -1 && xMax <= -1){//Shift y scale to the right
    ctx.fillText("f(t)",xpos + 35,ycenter - 20);
  }else{
    ctx.fillText("f(t)",xpos - 85,ycenter - 20);
  }
  ctx.stroke();

  ctx.beginPath();


  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.globalAlpha = 1.0;
  <!-- This is where the points must be drawn!!!  -->
  <!-- This section of the program will plot the points for the Fourier Series! -->
  <!-- For sake of simplicity I'm going to hold off on the "0000" and "1111" waves -->



  <!-- Function Code --------------------------------------------------==============================================================================>
  //Theoretically the xmin should be the same for all 3 cases... It should be [xmin - floor(xmin)] * interval

  var xminPval = interval * Math.abs(parseFloat(xmin) - parseInt(xmin));//If parseInt works the way I think it does this should leave the decimal portion of the xmin value
  var xmaxPval = interval * Math.abs(parseInt(xmin) - parseFloat(xmax));//Max should do the same but with 1 less interval (provided the -10,-1 example with only 9) Take the min and subtract from the max


  var xMinPval = Math.ceil(xminPval);//Used to find the proper point index for the plot   ; We don't need this anymore... we know where the plot will start and end!
  var xMaxPval = Math.ceil(xmaxPval);//Used to find the proper point index for the plot

  //Now xMinPval and xMaxPval should have the exact point value range to plot the points for all three conditions

  //We need a robust way to calculate the integrals for the fourier coefficients

  //General Form for a_0 START ************************************
  //Average of the pulses

  //I need to sift through all of this code and figure out what needs changing!

  var a0 = 0;
  var m = 0;
  for(m=0; m<pulsearray.length; m++){
     a0 += parseInt(pulsearray[m]); //a_0 portion
  }

  a0 = a0/(pulsearray.length); //division by 4 was not modular

  //General Form for a_0  END ************************************

  //General Form for a_n  START ************************************

  //No matter what the scenario, the integral always comes out the same. I will provide my handcalculations if necessary.
  function a_n(upper,lower,s,n){
    return ( ( Math.sin(upper*n) - Math.sin(lower*n) ) * parseInt(s) )/(Math.PI*n);
  }

  var aN = 0;

  //General Form for a_n  END ************************************

  //General Form for b_n  START ************************************

  function b_n(upper,lower,s,n){//Same as a_n but now its cos instead of sin from handcalculations
    return ( ( Math.cos(upper*n) - Math.cos(lower*n) ) * parseInt(s) )/(-1*Math.PI*n);
  }

  var bN = 0;

  //General Form for b_n END **************************************

  //Overall f(t) = a_0 + a_n*cos(n*t) + b_n*sin(n*t)
  //Now we can combine all three for loops into one just below this line for simplicity:

  var z = 0;
  var m = 0;
  n = parseInt(n);
  var p = 0;
  var y = a0;
  var aN = 0;
  var bN = 0;

  var coord = [];
  var points = [];
  var square = [];

  function storePointValues(xVal,yVal,array){
    array.push({x: xVal, y: yVal});
  }

  //******************************************************* x Limit modularity should be updated upto here *******************************************

  function squareYpos(p,twopi){//Based on the point value this function will return the y pulse value
    //Take the point value and place the value in the range from 0 to twopi (450)
    //Then determine if the point belongs to the particular pulsevalue
    var pulse = p;
    while(pulse > twopi){
      pulse = pulse - twopi;
    }
    var squareY = 0;
    for(i = 0; i < pulsearray.length; i++){
      if(pulse < (i + 1) * twopi/pulsearray.length && pulse >= i * twopi/pulsearray.length){
        squareY = pulsearray[i]; //Assign the proper pulse value based on the point index
      }
    }
    return squareY; //Return the proper pulse value based on the point index
  }

  var xShift = 0;
  if(xmin >= 1 && xmax >= 1){
    xShift = interval;
  }

  p = Math.abs(parseFloat(xmin));
  while(p > 2){
    p = p - 2;
  }

  p = p * interval; //This should fix the starting position for odd valued intervals

  var start = p;

  //We need to make this modular. If we have 3 pulses, then we need to divide 2pi by 3, so instead of pi/2 we'll have pi/3's
  //We also do not know how many divisions we'll have, so we need to modulate it.
  //We should make the below into a function, that way it wont take so long for us to display 
  function drawFourierSeries(n){//This draws the Fourier Series as well as the Square Wave
      for(p = start; p < start + (xMaxPval - xMinPval); p++){//1350.  The minimum point value should represent t = xmin, then in increments of 1 / interval
        for(z = 0; z<n; z++){ //Include n number of terms in the fourier series expansion
          for(i = 0; i < pulsearray.length; i++){
            aN += parseInt(pulsearray[i]) *  ( Math.sin( ( (z+1) * 2 * Math.PI/(pulsearray.length) ) * (i+1) ) - Math.sin( ( (z+1) * 2 * Math.PI/(pulsearray.length) ) * i ) ) / ( (z+1) * Math.PI );
            bN += parseInt(pulsearray[i]) *  ( Math.cos( ( (z+1) * 2 * Math.PI/(pulsearray.length) ) * (i+1) ) - Math.cos( ( (z+1) * 2 * Math.PI/(pulsearray.length) ) * i ) ) / ( -1 * (z+1) * Math.PI );
          }
          y += aN*Math.cos((z+1)*(p+1)*(2*Math.PI/twopi)) + bN*Math.sin((z+1)*(p+1)*(2*Math.PI/twopi));//Increment by 1/100 th instead of 1?
          //The value for p is wrong, it needs to start at
          aN = 0;
          bN = 0;
        }
        if(p < twopi){//This block needs to be changed due to the change in the value for p
          storePointValues(p,y,points);//store 2pi worth of points
        }
        var y_pos = ( ( (ycenter-ytop)/(0-parseInt(max)) ) * y ) + ycenter;//This y scale converter should provide the proper canvas point y position for the point placement 
        storePointValues(xShift + xstart + 1*(p+1) - start, y_pos, coord);
        //Determine the pulse value based on the point index using the squareYpos function defined above
        var square_pos = ( ( (ycenter-ytop)/(0-parseInt(max)) ) * squareYpos(p,twopi) ) + ycenter;
        storePointValues(xShift + xstart + 1*(p+1) - start, square_pos, square);
        y = a0;
      }
      //Fourier Series smooth line
      ctx.beginPath();
      ctx.lineWidth = parseInt(fw);//Line thickness of the Fourier Series
      ctx.globalAlpha = 0.5; //Should make the fourier series transparent
      ctx.moveTo(coord[xMinPval].x, coord[xMinPval].y);//This moveTo is now robust
      for(i=1; i<coord.length-2; i++){
        if(i >= xMinPval && i < xMaxPval){
          var xc = (coord[i].x + coord[i + 1].x) / 2;
          var yc = (coord[i].y + coord[i + 1].y) / 2;
          ctx.quadraticCurveTo(coord[i].x,coord[i].y,xc,yc);
        }
      }
      ctx.strokeStyle = fc;//Color of the Fourier Series line '#775500'
      if(i >= xMinPval && i < xMaxPval){
        ctx.quadraticCurveTo(coord[i].x,coord[i].y,coord[i+1].x,coord[i+1].y);
      }
      ctx.stroke();
      //Square wave smooth line
      ctx.beginPath();
      ctx.lineWidth = parseInt(sw);//Line thickness of the square wave
      ctx.globalAlpha = 0.5; //Should make the fourier series transparent
      ctx.moveTo(square[xMinPval].x, square[xMinPval].y);
      for(i=1; i<square.length-2; i++){
        if(i >= xMinPval && i < xMaxPval){
          var xc = (square[i].x + square[i + 1].x) / 2;
          var yc = (square[i].y + square[i + 1].y) / 2;
          ctx.quadraticCurveTo(square[i].x,square[i].y,xc,yc);
        }
      }
      ctx.strokeStyle = sc;//Different color for square wave '#00FF00'
      if(i >= xMinPval && i < xMaxPval){
        ctx.quadraticCurveTo(square[i].x,square[i].y,square[i+1].x,square[i+1].y);
      }
      ctx.stroke();
  }

  //I need to save the image of the canvas before we draw the Fourier Series
  ctx.stroke();
  drawFourierSeries(n);
  //To develop the y scale converter we need to know the position of the Max/Min element (This should be at the very top and/or very bottom of the y axis)
  //Max y coordinate: 20  Min y coordinate: 480, so we should have 3 points really, Max, Min, center
  //Center y coordinate: 250

  // (max,480) , (0,250)
  //We can make a line like last time with 2 points the y intercept and the max for simplicity:
  //y = mx + b
  //b = 250
  //m = (max-0)/(480-250)
  //y = ( (250-20) )/(0-max)  * y_ + 250
  <!-- Calculate the average error per period -->

  var error = 0;
  for(p = 0; p < twopi; p++){//We need to figure out which points belong to which pulse value
    for(i = 0; i < pulsearray.length; i++){
      if(p < (twopi/pulsearray.length) * (i+1) && p > (twopi/pulsearray.length) * i){//If the point lies inside pulse value index i:
        error += Math.abs(points[p].y - pulsearray[i]); //Absolute value of the difference between the approximation and actual point value.
      }
    }
  }
  //Now to get the average we need to take the error and divide it by 450 because there are 450 points per period.
  error = error / twopi;
  ctx.fillText("Average error: " + error,10,10);//Place average error on the top left hand corner of canvas

  <!-- Function Code END -------------------------------------------------------================================================================>

  //this.drawFunctions(ctx,n,pulsearray,i,twopi,xstart,xMinPval,xMaxPval,fw,sw,fc,sc,yend,ycenter,ytop);//This should draw the functions the same way, but now condensed into a seperate function!
  ctx.stroke();
}

function getInputValue(){

  pulsefunction = document.getElementById("pulse").value;
  n = document.getElementById("n").value;
  xMin = document.getElementById("xMin").value;
  xMax = document.getElementById("xMax").value;
  FourierWidth = document.getElementById("FourierWidth").value;
  FourierColor = document.getElementById("FourierColor").value;
  SquareWidth = document.getElementById("SquareWidth").value;
  SquareColor = document.getElementById("SquareColor").value;

  this.drawGraph(pulsefunction,c,ctx,n,xMin,xMax,FourierWidth,FourierColor,SquareWidth,SquareColor);//This function should draw the graphs input by the user to the canvas

}

function addOneTerms(){
  n = parseInt(n)+1;
  this.drawGraph(pulsefunction,c,ctx,n,xMin,xMax,FourierWidth,FourierColor,SquareWidth,SquareColor);//This function should draw the graphs input by the user to the canvas
}
function subOneTerms(){
  n = parseInt(n)-1;
  this.drawGraph(pulsefunction,c,ctx,n,xMin,xMax,FourierWidth,FourierColor,SquareWidth,SquareColor);//This function should draw the graphs input by the user to the canvas
}
