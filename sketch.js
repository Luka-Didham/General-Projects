/*
Etude 3, Koch snowflake
Sketch .js file which controls the drawing and interactions
with the user. This snowflake dynamically scales with the window and 
can be controlled with a slider paired with an iteration counter. Written 
in P5.js, launchable with Local Live Server (more in ReadMe!). 
@Author Luka Didham
*/ 
//Array of lines in snowflake
let lines = [];
//slider from 0-9 iteration counter
var slider;
//Current width and height of window
var myWidth, myHeight; 
//How many iterations of the snowflake to draw
var iterationCount; 
// HTML container for placing with .position
var display; 

/* 
Setup is called first in the program to setup the intial canvas and 
set the intial 3 points of the plain equilatoral triangle. 
*/ 
function setup() {
  myWidth = windowWidth;
  myHeight = windowHeight; 
  display = createCanvas(windowWidth, windowWidth);
  display.position(20,20); 
  slider = createSlider(1, 9, 0);
  slider.position(0, 0);
  slider.style("width", "200px");
  iterationCount = slider.value(); 
  textSize(30);
  startTriangle();
}

/*
startTriangle resets the lines array starting with a blank slate. startTriangle then
starts first creating a new plain triangle at coordinates specific to window size and 
procedes to iterativly create more trainagles in the Koch Snowflake fashion as many 
times as iterationCount/slider dictates. Uses identical point finding process of intial
triangle as Line.js does. 
*/
function startTriangle() {
  lines = [];
  display.clear(); 
  var dimensionUsed; 
  if(myWidth<=myHeight){
    dimensionUsed = myWidth;
  }else{
    dimensionUsed = myHeight; 
  }
  let a = createVector(dimensionUsed * 0.2, dimensionUsed  * 0.2);
  let b = createVector(dimensionUsed  * 0.8, dimensionUsed  * 0.2);
  let l1 = new Line(a, b);
  let length = p5.Vector.dist(a, b);
  //vertical height of pertuding point.
  let vh = (length * sqrt(3)) / 2;
  let c = createVector(dimensionUsed / 2, dimensionUsed*1.2 - vh );
  let l2 = new Line(b, c);
  let l3 = new Line(c, a);
  lines.push(l1);
  lines.push(l2);
  lines.push(l3);
  for (x = 1; x < iterationCount; x++) {
    iterate();
  }
}

/*
Function simply iteratively  creates children for each Line object in array lines[]. 
*/ 
function iterate() {
  let nextGen = [];

  for (let s of lines) {
    addArrays(s.createChildren(), nextGen);
  }
  lines = nextGen;
}

/*
Function is constantly looped. When windowsize and slider have not been 
changed draw() simply calls show() on each line which draws the lines, 
however if change does occur we restart process up to new Iteration count 
or with intial triangle points in new postions relative to new window size. 
*/ 
function draw() {
  
  if (checkWindowChange()) {
    myWidth = windowWidth;
    myHeight = windowHeight;
    resizeCanvas(myWidth, myHeight);
    startTriangle(); 
  }

  if (checkSliderChange()) {
    iterationCount = slider.value();
    startTriangle(); 
  }

  stroke(255);
  for (let l of lines) {
    l.show();
  }
  text(iterationCount, 0, 50);

}

/*
addArrays simply adds elements from one array to the end of another array
*/ 
function addArrays(arr, addTo) {
  for (let l of arr) {
    addTo.push(l);
  }
}

/*
Does what windowResized() should do in P5, however said function wasn't working
for me atleast with google chrome (perhaps because P5 is somewhat dated now) so 
has to make function which returns true if window is altered in any way. Is constantly
looped in the draw() function. 
*/ 
function checkWindowChange() {
  var changed = false;
  if ( myWidth != windowWidth || myHeight != windowHeight)   changed = true;
  return changed;
}

/*
Simply checks if slider and ofcourse then iterationCount has changed. Again
is constantly looped in the draw() function. 
*/ 
function checkSliderChange() {
  var changed = false;
  if (iterationCount!=slider.value())   changed = true;
  return changed;
}