var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var n, pulsefunction, xMin, xMax, FourierWidth, FourierColor, SquareWidth, SquareColor;


//Define a variety of functions to be called from different javascript files


//Function 1: Will define the x axis of the graph only
function drawGridlines(ytop,yend,xstart,xend){
      //We should probably draw the y and x axis here, so that we can properly scale the graph first...
        // I'd love to do this, but javascript wont let me...

        <!-- This is the start of the square wave -->
        <!-- Any state transitions will require 3 lines, not 2. -->
        <!-- pi/2 and 2pi/2 are tied to 5pi/2 and 6pi/2, and 9pi/2 and 10pi/2 -->

        <!-- Y-axis modular variables -->

        //var ycenter = 250;
        

        <!-- X-axis modular variables end -->


        //Style
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';

        <!-- So this means that each interval is in 450 pixels, so the text will look like pi/2 , 2pi/2, 3pi/2, ... until 12pi/2 -->

        ctx.font = "30px Courier New";

        //ctx.font = "30px Courier New";

        var xpos = 0;

        if(xMin >= 1 && xMax >= 1){
          xpos = xstart;
        }else if(xMin <= -1 && xMax <= -1){
          xpos = xend;
        }else{
          xpos = xstart;
        }
        //The first function is called drawGridlines. I will first try reversing this function creation since some current issues were caused due to 
        // function creation

        <!-- Add the y-axis gridlines here -->
        //This should be modular based on the limits provided by the user. So, whatever our x axis range is, should determine the placement of the axis

        ctx.fillText("n: "+n,1000,20);//This should display the current value of n to the screen

        var numVertical = Math.abs(Math.ceil(xMax) - Math.floor(xMin)); //This should be the total number of lines that are required for the modular graph creation.

        var min = Math.floor(xMin);
        var max = Math.ceil(xMax);
        //Now that we have the total number of vertical gridlines, we need to determine how to place the lines on the x axis

        var xSize = xend - xstart;
        var interval = 0;
        var counter = 0;
        var count = min;

        interval = xSize / numVertical;

        if(min <= -1 && max <= -1){//Y-axis right justified   Case #1
          interval = xSize / (numVertical + 1); //Interval between each of the vertical axis
        }else if(min >= 1 && max >= 1){//Y-axis left justified    Case #2
          interval = xSize / (numVertical + 1); //Interval between each of the vertical axis
        }else{
          interval = xSize / numVertical;//Have the interval be exact now that it cuts through 0.
        }

        //The ultimate goal of this is to make sure that all of the vertical axis can be fit in a way that the user can see the entire graph without the need for
        //a scroll bar



        if (min <= -1 && max <= -1){//When min is -3 and max is -1, I expect that there will be vertical gridlines drawn from current y-axis position to the 
          for(i=Math.abs(min); i>=(Math.abs(max)); i--){//second to last position.
            if( (i % 2) == 0){
              ctx.beginPath();
              ctx.lineWidth = 8; //For 2 pi make the gridline thickness larger
            }
            if( (i % 2) != 0){//This modification should place the proper 2pi vertical gridlines!
              ctx.beginPath();
              ctx.lineWidth = 1; //Make pi line width equal to 1.
            }
            ctx.moveTo(xstart+interval*(counter) , ytop);
            ctx.lineTo(xstart+interval*(counter) , yend);//Since the first gridline covers from xstart to xstart + interval we want to fill in all of the points between these two gridlines

            if(count == 1){
              ctx.fillText( "\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }else if(count == -1){
              ctx.fillText( "-\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }else{
              ctx.fillText( count+"\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }

            counter++;
            count++;
            ctx.stroke();
          }
        }else if (min >= 1 && max >= 1){//This should start the first vertical gridline shifted to the right 1 interval to account for separation from the y axis
          for(i=min; i<(max+1); i++){
            if( (i % 2) == 0){//Why is this never executing?
              ctx.beginPath();
              ctx.lineWidth = 8; //For 2 pi make the gridline thickness larger
            }
            if( (i % 2) != 0){//This modification should place the proper 2pi vertical gridlines!
              ctx.beginPath();
              ctx.lineWidth = 1; //Make pi line width equal to 1.
            }
            ctx.moveTo(xstart+interval*(counter + 1) , ytop);
            ctx.lineTo(xstart+interval*(counter + 1) , yend);

            if(count == 1){
              ctx.fillText( "\u03C0",xstart+interval*(counter+1),yend + 20); //Should label every pi only
            }else if(count == -1){
              ctx.fillText( "-\u03C0",xstart+interval*(counter+1),yend + 20); //Should label every pi only
            }else{
              ctx.fillText( count+"\u03C0",xstart+interval*(counter+1),yend + 20); //Should label every pi only
            }

            counter++;
            count++;
            ctx.stroke();
          }
        }else{ //x limits run through 0 not necessarily on one side of the y axis
          for(i=min; i<(max+1); i++){//I'm expecting this to go from -3 to 3...
            if( (i % 2) == 0){//Why is this never executing?
              ctx.beginPath();
              ctx.lineWidth = 8; //For 2 pi make the gridline thickness larger
            }
            if( (i % 2) != 0){//This modification should place the proper 2pi vertical gridlines!
              ctx.beginPath();
              ctx.lineWidth = 1; //Make pi line width equal to 1.
            }
            ctx.moveTo(xstart+interval*(counter) , ytop); //The first vertical gridline should start where counter is 0. But if count is 0, then we need to emphasis that as the y axis
            ctx.lineTo(xstart+interval*(counter) , yend);

            if(count == 1){
              ctx.fillText( "\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }else if(count == -1){
              ctx.fillText( "-\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }else{
              ctx.fillText( count+"\u03C0",xstart+interval*(counter),yend + 20); //Should label every pi only
            }

            counter++;
            count++;
            ctx.stroke();
          }
        }
        ctx.lineWidth = 1;
}



