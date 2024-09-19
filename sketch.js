let nameInput; // variable to store the text input
let button; // variable to store the button
let greeting; // variable to store the greeting text
let saveGifButton; // variable to store the save gif button
let spinner; // variable to store the loading spinner
let bgColor;

let font; // variable to store the loaded font
let points = []; // array to store the points that make up the text
let r = 15; // variable to store the radius of the dots
let angle = 0; // variable to store the angle for rotating the dots
let ranFactor; // variable to store a random factor for text point sampling
let c = 0; // color of dots
let currentName = "Anna"; // default name at the moment

let movementPattern = 0; // Variable to control the movement pattern

function preload() { // loads external assets like font/images
  font = loadFont("Roboto-Regular.ttf"); // Ensure this path is correct
  console.log("Font loaded:", font);
}

function setup() { // function that runs when the program starts
  createCanvas(800, 450); // Set the canvas size
  angleMode(DEGREES); // sets angle mode to degrees
  colorMode(HSB); // sets color mode to HSB (Hue, Saturation, Brightness)

  // Random factor for text point sampling
  ranFactor = random(0.07, 0.9);

    // Initialize background color
    bgColor = color(220); // Default background color


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
  saveGifContainer.position(-1050, 300);
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
  background(bgColor); // clear the background

  // Draw a smaller white background behind the name
  fill(0, 0, 100, 0.5); // white color
  noStroke();
  rect(width * 0.05 - 20, height / 2 - 170, width * 0.9 + 40, 300); // adjust the size and position of the rectangle

  // Draw the points with animation
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let x = pt.x + sin(angle + i) * 15; // Animate x position
    let y = pt.y + cos(angle + i) * 15; // Animate y position

    switch (movementPattern) {
      case 0:
        x = lerp(pt.x, pt.x + sin(angle * 4 + i * 0.5) * 15, 0.5); // Slow initial movement
        y = lerp(pt.y, pt.y + cos(angle * 4 + i * 0.5) * 15, 0.5); // Slow initial movement
        break;
      case 1:
        x = lerp(pt.x, pt.x + cos(angle * 4 + i * 0.5) * 15, 0.5); // Slow initial movement
        y = lerp(pt.y, pt.y + sin(angle * 4 + i * 0.5) * 15, 0.5); // Slow initial movement
        break;
      case 2:
        x = lerp(pt.x, pt.x + tan(angle * 8 + i * 0.5) * 15, 0.5); // Slow initial movement
        y = lerp(pt.y, pt.y + tan(angle * 8 + i * 0.5) * 15, 0.5); // Slow initial movement
        break;
      case 3:
        x = lerp(pt.x, pt.x + sin(angle * 8 + i * 0.5) * 15, 0.5); // Slow initial movement
        y = lerp(pt.y, pt.y + cos(angle * 8 + i * 0.5) * 15, 0.5); // Slow initial movement
        break;
      default:
        x = lerp(pt.x, pt.x + sin(angle * 14 + i * 0.1) * 15, 0.5); // Slow initial movement
        y = lerp(pt.y, pt.y + cos(angle * 14 + i * 0.1) * 15, 0.5); // Slow initial movement
    }

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
  points = font.textToPoints(name, width * 0.07, height / 1.5, 300, {
    sampleFactor: ranFactor,
    simplifyThreshold: 0
  });
  console.log("Points updated:", points);
}

function mousePressed() {
 // Change the style of the name on mouse click
 r = random(5, 25); // Random radius between 5 and 20
 c = color(random(360), 30, 90); // Random color in HSB mode

  // Change the background color
  bgColor = color(random(360), 30, 90); // Random color in HSB mode
   // Change the sample factor to adjust the distances of the dots
   ranFactor = random(0.09, 0.2); // Random sample factor between 0.05 and 0.2
   updatePoints(currentName); // Update the points with the new sample factor
  // Change the movement pattern
  movementPattern = (movementPattern + 1) % 4; // Cycle through movement patterns
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
