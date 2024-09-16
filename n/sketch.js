let nameInput; // variable to store the text input
let button; // variable to store the button
let greeting; // variable to store the greeting text

let font; // variable to store the loaded font
let points = []; // array to store the points that make up the text
let r = 15; // variable to store the radius of the dots
let angle = 0; // variable to store the angle for rotating the dots
let ranFactor; // variable to store a random factor for text point sampling
let c = 0; // color of dots
let currentName = "Anna"; // default name at the moment

function preload() { // loads external assets like font/images
  font = loadFont("fonts/Roboto-Regular.ttf"); // Ensure this path is correct
}

function setup() { // function that runs when the program starts
  createCanvas(windowWidth, windowHeight); // canvas covers the entire window
  angleMode(DEGREES); // sets angle mode to degrees
  colorMode(HSB); // sets color mode to HSB (Hue, Saturation, Brightness)

  // Random factor for text point sampling
  ranFactor = random(0.07, 0.9);

  // Convert default name to an array of points using the loaded font
  points = font.textToPoints(currentName, width * 0.05, height / 2, 300, { // (x-coordinate, y-coordinate, font size)
    sampleFactor: ranFactor,
    simplifyThreshold: 0
  });

  // Create input elements
  nameInput = createInput(); // create a text input field
  nameInput.position(20, 65); // position the input field

  button = createButton('submit'); // create a button
  button.position(nameInput.x + nameInput.width, 65); // position the button
  button.mousePressed(updateText); // set the button's action

  greeting = createElement('h2', 'Enter your name'); // create a greeting element
  greeting.position(20, 5); // position the greeting element
}

function draw() {
  background(220); // clear the background

  // Draw the points
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    stroke(c, 100, 100);
    strokeWeight(r);
    point(pt.x, pt.y);
  }
}

function updateText() {
  currentName = nameInput.value(); // get the value from the input field
  greeting.html('Hello ' + currentName + '!'); // update the greeting

  // Update the points array with the new name
  points = font.textToPoints(currentName, width * 0.05, height / 2, 300, {
    sampleFactor: ranFactor,
    simplifyThreshold: 0
  });
}

function mousePressed() {
  let radius = random(10, 50); // Random radius between 10 and 50
  let x = mouseX;
  let y = mouseY;
  let randomColor = color(random(255), random(255), random(255)); // Random color

  noStroke();
  fill(randomColor);
  ellipse(x, y, radius, radius);
}

// Save a 5-second gif when the user presses the 's' key
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 1 });
  }
}