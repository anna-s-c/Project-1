let nameInput; // variable to store the text input
let button; // variable to store the button
let greeting; // variable to store the greeting text
let saveGifButton; // variable to store the save gif button
let spinner; // variable to store the loading spinner

let font; // variable to store the loaded font
let points = []; // array to store the points that make up the text
let r = 15; // variable to store the radius of the dots
let angle = 0; // variable to store the angle for rotating the dots
let ranFactor; // variable to store a random factor for text point sampling
let c = 0; // color of dots
let currentName = "Anna"; // default name at the moment

function preload() { // loads external assets like font/images
  font = loadFont("Roboto-Regular.ttf"); // Ensure this path is correct
}

function setup() { // function that runs when the program starts
  createCanvas(800, 450); // Set the canvas size
  angleMode(DEGREES); // sets angle mode to degrees
  colorMode(HSB); // sets color mode to HSB (Hue, Saturation, Brightness)

  // Random factor for text point sampling
  ranFactor = random(0.07, 0.9);

  // Convert default name to an array of points using the loaded font
  updatePoints(currentName);

  // Create input elements
  nameInput = createInput(); // create a text input field
  nameInput.position(20, 125); // position the input field

  button = createButton('submit'); // create a button
  button.position(nameInput.x + nameInput.width + 10, 125); // position the button
  button.mousePressed(updateText); // set the button's action

  greeting = createElement('h2', 'Enter your name'); // create a greeting element
  greeting.position(30, 100); // position the greeting element

  // Create save GIF button container
  let saveGifContainer = createDiv();
  saveGifContainer.position(-1020, 350);
  saveGifContainer.style('position', 'relative');

  // Create save GIF button
  saveGifButton = createButton('Save GIF'); // create a save GIF button
  saveGifButton.parent(saveGifContainer); // append button to container
  saveGifButton.mousePressed(startSavingGif); // set the button's action to save the GIF

  // Create loading spinner
  spinner = createDiv();
  spinner.class('spinner');
  spinner.parent(saveGifContainer); // append spinner to container
}

function draw() {
  background(220); // clear the background

  // Draw a smaller white background behind the name
  fill(255); // white color
  noStroke();
  rect(width * 0.05 - 20, height / 2 - 100, width * 0.9 + 40, 200); // adjust the size and position of the rectangle

  // Draw the points with animation
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let x = pt.x + sin(angle + i) * 10; // Animate x position
    let y = pt.y + cos(angle + i) * 10; // Animate y position
    let hue = (angle * 10 + i * 10) % 360; // Animate color
    stroke(hue, 100, 100);
    strokeWeight(r);
    point(x, y);
  }

  angle += 0.05; // increment the angle
}

function updateText() {
  currentName = nameInput.value(); // get the value from the input field
  greeting.html('Hello ' + currentName + '!'); // update the greeting

  updatePoints(currentName); // update the points array with the new name
}

function startSavingGif() {
  showSpinner();
  saveGif('mySketch', 5, { delay: 1 }).then(hideSpinner);
}

function showSpinner() {
  spinner.style('display', 'block');
}

function hideSpinner() {
  spinner.style('display', 'none');
}

function updatePoints(name) {
  // Update the points array with the new name
  points = font.textToPoints(name, width * 0.05, height / 2, 300, {
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

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updatePoints(currentName);
}
  