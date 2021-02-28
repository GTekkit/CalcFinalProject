//Grady Marshall
//5/30/19

const canvasWidth = 1440, canvasHeight = 720;         //window size
var slider1, slider2, slider3, slider4, slider5, slider6, slider7, maxAngle=0;   //declsrstion only vaariables
var sliderX = 30, sliderYdiff = 50;                   //slider positions
var sliderLength = '200px';                           //has to be a string, dont change to a var (KEEP THE SAME)
var sliderLengthInt = 200;                            //Int version of sliderLength (KEEP THE SAME)
var parameters = [];
var lastParameters = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(RGB, 255, 255, 255, 1);

  slider1 = createSlider(0, 2* PI, 0, 0.0001); //theta
  slider1.position(sliderX, sliderYdiff);
  slider1.style('width', sliderLength);
  
  slider2 = createSlider(0, 12, 1, 1);      //number of pendulums
  slider2.position(sliderX, sliderYdiff*2);
  slider2.style('width', sliderLength);
  
  slider3 = createSlider(0, 1, 0.5, 0.01);  //ratio of any pendulum length to the next pendulum 
  slider3.position(sliderX, sliderYdiff*3);
  slider3.style('width', sliderLength);
  
  slider4 = createSlider(0, 10, 2, 0.5);      //ratio of any pendulum angle to the next pendulum (reciprocal)
  slider4.position(sliderX, sliderYdiff*4);
  slider4.style('width', sliderLength);
  
  slider5 = createSlider(0.0005, 0.1, 0.01, 0.0005);      //accuracy
  slider5.position(sliderX, sliderYdiff*5);
  slider5.style('width', sliderLength);
  
  slider6 = createSlider(0.1, 2, 1, 0.05);      //color correction
  slider6.position(sliderX, sliderYdiff*6);
  slider6.style('width', sliderLength);
  
  slider7 = createSlider(0, 2, 1, 0.5);      //draw mode
  slider7.position(sliderX, sliderYdiff*8);
  slider7.style('width', sliderLength);
}

function draw() {
  translate(canvasWidth/2, canvasHeight/2);
  parameters = [slider1.value(),slider2.value(),slider3.value(),slider4.value(),slider5.value(), slider6.value(), slider6.value(), maxAngle];
  
  if(change() && (slider7.value() !== 0)){
    background(255, 255, 255, 1);
    testExtreeme();
    drawText();
    drawArms(200, -slider1.value(), slider2.value(), slider3.value(), slider4.value());
    drawGraph(200, slider2.value(), slider3.value(), slider4.value(), slider5.value(), slider6.value());
  }
}

function change(){
  for(i=0;i<parameters.length;i++){
    if(lastParameters[i] !== parameters[i]){
      lastParameters[n] = parameters[n];
      return true;
    }
  }
  return false;
}

function testExtreeme(){
  if(slider1.value() > maxAngle){
    maxAngle = slider1.value();
  }
}

function drawText(){
  push();
    translate(-canvasWidth/2, -canvasHeight/2);
    text("Angle        = " + slider1.value() + " radians", sliderX + sliderLengthInt + 10, sliderYdiff + 10); //slider1 (angle)
    text("Pendulums    = " + slider2.value(), sliderX + sliderLengthInt + 10, sliderYdiff*2 + 10); //slider2 (number of pendulums)
    text("Length Ratio = " + slider3.value(), sliderX + sliderLengthInt + 10, sliderYdiff*3 + 10); //slider3 (length ratio)
    text("Angle Ratio  = " + slider4.value(), sliderX + sliderLengthInt + 10, sliderYdiff*4 + 10); //slider4 (angle ratio)
    text("Accuracy     = " + slider5.value(), sliderX + sliderLengthInt + 10, sliderYdiff*5 + 10); //slider5
    text("Darkness factor     = " + slider6.value(), sliderX + sliderLengthInt + 10, sliderYdiff*6 + 10); //slider6
  pop();
}

function drawArms(l, a , n, ld, ad){
  push();
    for(j=1; j < n+1; j++){
      rotate(a*j*pow(ad,j-1));
      strokeWeight(5);
      stroke(0,0,0,1);
      line(0, 0, l*pow(ld,j-1), 0);
      translate(l*pow(ld,j-1),0);
    }
  pop();
}

function drawGraph(l, n, ld, ad, a, b){
  for(j=1; j < n+1; j++){ //interval for each value of n
    for(i=0; i < maxAngle; i += a){  //making every line segment in the given layer 'n'
      var angle=0,tempX=0, tempY=0, nextX=0, nextY=0, origX=0, origY=0;
      for(k=1; k < j+1; k++){    
        angle += i*k*pow(ad,k-1);
        tempX += l*(cos(angle))*pow(ld,k-1);  //TempX adding all of the cosins * lengths of the pendulums
        tempY -= l*sin(angle)*pow(ld,k-1);    //TempY adding all of the sins * lengths of the pendulums
        nextX += l*cos(angle*(i+a)/i)*pow(ld,k-1);    //NextX adding all of the next cosins * lengths of the pendulums
        nextY -= l*sin(angle*(i+a)/i)*pow(ld,k-1);//NextY adding all of the next sins * lengths of the pendulums
      }
      angle = 0;
      for(k=1; k < j; k++){                   
        angle += (i)*k*pow(ad,k-1);
        origX += l*cos(angle)*pow(ld,k-1);//OrigX adding all of the last instances cosins * lengths of the pendulums
        origY -= l*sin(angle)*pow(ld,k-1);//OrigY adding all of the last instances sins * lengths of the pendulums
      }
      angle = 0;
      push();
        stroke(0, 0, 0, map(j,1,n,0.1,0.5)*b);
        strokeWeight(1);
        line(tempX,tempY,nextX,nextY);
        line(tempX,tempY,origX,origY);
      pop();
    }
  }
}
