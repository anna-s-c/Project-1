let nameInput; // variable to store the text input
let button; // variable to store the button
let greeting; // variable to store the greeting text

let font; // variable to store the loaded font
let points = []; // array to store the points that make up the text
let r = 15; // variable to store the radius of the dots
let angle = 0; // variable to store the angle for rotating the dots
let ranFactor; // variable to store a random factor for text point sampling
let c = 0; // color of dots
let currentName = "Anna"; // default name rn

function preload() { // loads external assets like font/images
  font = loadFont("fonts/Roboto-Regular.ttf"); // Ensures this path is correct
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
  greeting = createElement('h2', 'What is your name?');
  greeting.position(20, 5);

  nameInput = createInput();
  nameInput.position(20, 65);

  button = createButton('submit');
  button.position(nameInput.x + nameInput.width, 65);
  button.mousePressed(greet);

  nameInput.changed(greet);
}

function draw() {
  background(220, 0.07);
  drawPoints();
  
  c += 0.1; 
  c = c % 360; // cycling around the color wheel
  angle += 10;
}

function drawPoints() {
  for (let i = 0; i < points.length; i++) {
    noStroke();
    stroke(c, 50, 100);

    let brightness = map(i, 0, points.length, 50, 100); // Map index to brightness between 50 and 100

    fill(c, 100, brightness);

    ellipse(points[i].x + r * sin(angle + i * 25), points[i].y, height * 0.05, height * 0.05);
  }
}

function greet() {
  background(255);

  // Get the name from the input field
  currentName = nameInput.value();

  // Update the greeting text
  greeting.html(`Hello, ${currentName}!`);

  // Convert the new name to points for animation
  points = font.textToPoints(currentName, width * 0.05, height / 2, 300, {
    sampleFactor: ranFactor,
    simplifyThreshold: 0
  });

  // Clear the input field after submitting
  nameInput.value('');
}

// Draw random circles at mouse position on mouse click
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
