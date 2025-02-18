let button;
let onButton, offButton;
let buttonPressed = 0; // 0 = normal, 1 = first page, 2 = second page
let textX, textY;
let redEyeX, redEyeY;

let img1, img2, img3, img4, img5, img6;
let images = [];
let song1, song2, song3;
let visibleImages = 1;
let phase = 1;
let phaseTimer = 0;

function preload() {
  img1 = loadImage('images/img1.jpeg');
  img2 = loadImage('images/img2.jpeg');
  img3 = loadImage('images/img3.jpeg');
  img4 = loadImage('images/img4.jpeg');
  img5 = loadImage('images/img5.jpeg');
  img6 = loadImage('images/img6.jpeg');

  song1 = loadSound('sound/3500Hz.mp3');
  song2 = loadSound('sound/malfunction.mp3');
  song3 = loadSound('sound/projector.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textX = 20;
  textY = 20;
  redEyeX = windowWidth * 0.5;
  redEyeY = windowHeight * 0.5;

  button = createButton('Oh you found me');
  button.position(redEyeX + 20, redEyeY + 20);
  button.hide();
  button.mousePressed(() => {
    buttonPressed = 1;
  });

  onButton = createButton('ON');
  offButton = createButton('OFF');
  onButton.hide();
  offButton.hide();

  onButton.mousePressed(handleOnClick);
  offButton.mousePressed(() => {
    buttonPressed = 2;
  });

  images.push(img1, img2, img3, img4, img5, img6);
}

function draw() {
  if (buttonPressed === 1) {
    newPage();
  } else if (buttonPressed === 2) {
    newPage2();
  } else {
    mainPage();
  }
}

function mainPage() {
  background(0);
  fill(255, 255, 255, 150);
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);

  let eyes = [
    { x: width * 0.1, y: height * 0.15, length: 95 },
    { x: redEyeX, y: redEyeY, length: 100 },
    { x: width * 0.75, y: height * 0.3, length: 110 }
  ];

  let showButton = false;

  strokeWeight(5);
  for (let eye of eyes) {
    let d = dist(mouseX, mouseY, eye.x, eye.y);
    if (d < 60) {
      stroke(255);
      line(eye.x - eye.length / 2, eye.y, eye.x + eye.length / 2, eye.y);
      if (eye.x === redEyeX) {
        line(eye.x, eye.y, eye.x + 50, eye.y);
        stroke(255, 0, 0);
        point(eye.x, eye.y);
        showButton = true;
      }
    }
  }

  if (showButton) {
    let jitterX = random(-1.5, 1.5);
    let jitterY = random(-1.5, 1.5);
    button.show();
    button.position(redEyeX + 20 + jitterX, redEyeY + 20 + jitterY);
  } else {
    button.hide();
  }
}

function newPage() {
  background(255);
  button.hide();
  drawLamp();
  fill(0);
  stroke(0);
  strokeWeight(1);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Since you are here, do me a favor...press ON and we will be fine', textX, textY + 30);
  text('Whatever you do, DO NOT turn it off.', textX, textY + 55);
  fill(255, 255, 255, 250);
  text('You know what you have to do...', textX, textY + 500);
  showRandomButton(onButton);
  offButton.show();
}

function drawLamp() {
  let lineX = windowWidth - 40;
  strokeWeight(3);
  stroke(255, 255, 0);
  line(lineX, 0, lineX, height);
  noFill();
  beginShape();
  vertex(lineX - 15, height);
  vertex(lineX + 15, height);
  vertex(lineX, height - 30);
  endShape(CLOSE);
  stroke(255, 255, 0);
  noFill();
  arc(lineX, height, 30, 30, 0, PI);
  fill(255, 255, 0, 100);
  noStroke();
  ellipse(lineX, height - 30, 80, 80);
}

function showRandomButton(button) {
  let randomX = random(50, width - 150);
  let randomY = random(50, height - 80);
  button.position(randomX, randomY);
  button.show();
}

function handleOnClick() {
  const currentSize = parseFloat(window.getComputedStyle(offButton.elt).fontSize);
  offButton.style.fontSize = `${currentSize * 1.5}px`;
}

function newPage2() {
  background(0); 
  
  onButton.hide();
  offButton.hide();
  
  song1.loop();
  song2.loop();
  song3.loop();

  if (millis() - phaseTimer > 3000) {
    phaseTimer = millis();
    if (phase === 1) {
      visibleImages++;
      if (visibleImages >= 3) phase = 2;
    } else if (phase === 2) {
      visibleImages *= 2;
      if (visibleImages >= images.length) {
        visibleImages = images.length;
        phase = 3;
      }
    } else if (phase === 3) {
      frameRate(random(10, 60));
    }
  }

  for (let i = 0; i < visibleImages; i++) {
    let ranX = random(width - 80);
    let ranY = random(height - 80);
    image(images[i % images.length], ranX, ranY);
  }

  addGrain(visibleImages * 5);
}

function addGrain(intensity) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let grain = random(-intensity, intensity);
    pixels[i] += grain;
    pixels[i + 1] += grain;
    pixels[i + 2] += grain;
  }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
