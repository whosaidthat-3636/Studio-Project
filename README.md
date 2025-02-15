# Studio-Project

- chosen theme
- idea starting off based of workshop 9 with the torch like effect but without live video
- expanding as we go

### General idea
- text
- to flash over eyes
- button press to change into white background

## Setup
- wider width
- black background so emphasis on object color
```
function setup() {
  createCanvas(500, 400);}

function draw() {
  background(0);}
```
## Iteration 1
- eyes
- torch over to appear
- button pressed to change into white background 

### Torch
- fourth parameter is transparency value
- adding transparency so when hovered over object it plays more into the "torch" effect
- order of operations is considered because if this was placed AFTER the 'eyes'
- before 'eyes'

<img width="91" alt="image" src="https://github.com/user-attachments/assets/2908e8c0-9a76-491e-ac57-163adc30181f" />


- versus after 'eyes' which makes it a little blurry and milky, taking away from the effect

<img width="85" alt="image" src="https://github.com/user-attachments/assets/8ea33779-8c6c-4a55-9d6e-6716a1305aa6" />

- mouse XY to follow user's mouse, this creates a more direct interactive experience in "forcing" the user to interact with the piece
```
 fill(255, 255, 255, 150);
  ellipse(mouseX, mouseY, 80, 80);
```

### Eyes
- writing individual
- **i acknowledge that this could've been written in an array however this works for me as opposed to an array
- fill over certain ellipses to obtain color
```
  ellipse(70, 70, 95, 58);
  ellipse(280, 280, 100, 50);
  ellipse(420, 170, 110, 70);
  fill(0);
  ellipse(60, 70, 50, 50);
  ellipse(90, 70, 30, 30);
  ellipse(280, 280, 45, 35);
  ellipse(420, 155, 45, 35);
  ellipse(420, 185, 45, 35);
  fill(255, 0, 0);
  ellipse(280, 280, 10, 10);
```

### Button
- button to only appear when mouseXY is directed at a certain coordinate
- this means it could also be AWAY from the button and it would appear, i thought the idea was interesting and could be experimented with down the line
<img width="162" alt="image" src="https://github.com/user-attachments/assets/b4f75c49-f8bb-46e1-9793-7ae998a0672f" />


```
let button;

function setup() {
  createCanvas(500, 400);
  button = createButton('...');
  button.position(250, 310);
  button.hide();

 let d = dist(mouseX, mouseY, 305, 310); 

  if (d < 50) { // If close enough, show button
    button.show();
  } else {
    button.hide();
  }
```

### Torch effect
#### Eyes
- creating an array for the ellipses rather than individually writing code
```
let eyes = [
    { x: 70, y: 70, w: 95, h: 58 },
    { x: 280, y: 280, w: 100, h: 50 },
    { x: 420, y: 170, w: 110, h: 70 }
  ];
```
- writing loop to go through each of the array
- if function based of mouse position, if mouse if within the range ellipse would appear
```
 for (let i = 0; i < eyes.length; i++) {
    let eye = eyes[i];  
    let d = dist(mouseX, mouseY, eye.x, eye.y);
    if (d < 70) { // Only show if within torch range
      fill(255);
      ellipse(eye.x, eye.y, eye.w, eye.h);
```
- if the current position of eye is EXACTLY 70
  * draw two ellipses which makes up the eye, pupil at (60, 70), overall eyeshape at (90, 70)
- else if eye is at 280
  * draw two ellipse one as the black pupil
  * the other smaller red pupil
- if conditions are unfulfilled and position is at 420
  * two ellipses would be drawn at the almost the same position
  * the two ellipses overlap

```
fill(0);
      if (eye.x === 70) {
        ellipse(60, 70, 50, 50);
        ellipse(90, 70, 30, 30);
      } else if (eye.x === 280) {
        ellipse(280, 280, 45, 35);
        fill(255, 0, 0);
        ellipse(280, 280, 10, 10);
      } else if (eye.x === 420) {
        ellipse(420, 155, 45, 35);
        ellipse(420, 185, 45, 35);
      }
```
#### Button appearing 
- the previous code had to be updated as i wanted it to appear based on the ellipse it was near to
```
 let showButton = 0;

} else if (eye.x === 280) {
        ellipse(280, 280, 45, 35);
        fill(255, 0, 0);
        ellipse(280, 280, 10, 10);
        showButton = 1;

  if (showButton) {
    button.show();
  } else {
    button.hide();
  }
}
```

#### Button mousePressed
- the idea was to have it act as a light switch
- tentative condition: button pressed, all ellipses and button disappear -> replaced with white canvas
```
let button;
let buttonPressed = 0; 

function setup() {
  createCanvas(500, 400);
  button = createButton('Oh, you found me...');
  button.position(280, 320); // Below the red-pupil eye
  button.hide(); 
  button.mousePressed(() => {
    buttonPressed = 1; 
  });
}

function draw() {
  if (buttonPressed === 1) {
    background(255); // Change background to white
    button.hide(); // Hide button after it's pressed
  } else {
  background(0);
```

## Iteration 2
### Line
- change in vision
- replacing ellipses with line
- ellipses that act as "torch" remains
- I initially changed the value for the if function for torch range
  * as lines take up lesser surface area so it makes sense for it to be closer
  * however, it fails to reach the button which means the button disappears past the point where my cursor is at in the picture therefore altered to 55 for it to be easily used
<img width="184" alt="image" src="https://github.com/user-attachments/assets/05e02353-90a6-4d10-9633-dafe7ca09d9b" />

- had trouble with writing the line that accounts for the array and asked ChatGPT with the prompt ""

```
for (let i = 0; i < eyes.length; i++) {
      let eye = eyes[i];
      let d = dist(mouseX, mouseY, eye.x, eye.y);
      if (d < 60) { // Only show if within torch range
        stroke(255); // White lines for the eyes
        line(eye.x - eye.length / 2, eye.y, eye.x + eye.length / 2, eye.y); 

        if (eye.x === 70) {
          line(60, 70, 100, 70); 
          line(90, 70, 120, 70); 
        } else if (eye.x === 280) {
          line(280, 280, 280 + 50, 280); 
          stroke(255, 0, 0); 
          point(280, 280); 
          showButton = 1;
        } else if (eye.x === 420) {
          line(420, 155, 420 + 45, 155); 
          line(420, 185, 420 + 45, 185);
        }
      }
    }

```

### Changing button condition
- inspo [https://github.com/ivysone/Will-you-be-my-Valentine-]
- was inspired by this

- text to jitter like in workshop 7
```
let font1;

let textX = 210;
let textY = 100;

function preload() {
  font1 = loadFont('who asks satan.ttf');
}

function newPage() {
  background(0);
  button.hide();

  let jitterX = random(-1.5, 1.5);
  let jitterY = random(-1.5, 1.5);

  fill(255, 255, 255);
  stroke(0);
  textAlign(CENTER, TOP);
  textFont(font1,60);
  text('LEAVE', textX + jitterX, textY + jitterY);
```
- ![GIF](https://github.com/user-attachments/assets/32473b03-fc59-41f2-bd4d-dd1ddf497863)
- had trouble getting to work for awhile only to realise i forgot the variables

### Window resize
- asking chatgpt to help update object position
```
let button;
let buttonPressed = 0; // 0 = normal, 1 = button pressed

let textX, textY;
let redEyeX, redEyeY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set text position
  textX = windowWidth * 0.5;
  textY = windowHeight * 0.3;

  // Set red eye position dynamically
  redEyeX = windowWidth * 0.5;
  redEyeY = windowHeight * 0.5;

  button = createButton('Oh you found me');
  button.position(redEyeX + 20, redEyeY + 20); // Closer to red eye
  button.hide(); // Start hidden
  button.mousePressed(() => {
    buttonPressed = 1; // Switch to new page
  });
}

function draw() {
  if (buttonPressed === 1) {
    newPage(); // Switch to eerie text page
  } else {
    mainPage(); // Normal flashlight interaction
  }
}

function mainPage() {
  background(0);

  // Flashlight effect
  fill(255, 255, 255, 150);
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);

  // Eye positions
  let eyes = [
    { x: width * 0.1, y: height * 0.15, length: 95 },
    { x: redEyeX, y: redEyeY, length: 100 }, // Red pupil eye
    { x: width * 0.75, y: height * 0.3, length: 110 }
  ];

  let showButton = false; // Track if near red-pupil eye

  strokeWeight(5);

  for (let eye of eyes) {
    let d = dist(mouseX, mouseY, eye.x, eye.y);

    if (d < 60) { // Only show if within range
      stroke(255);
      line(eye.x - eye.length / 2, eye.y, eye.x + eye.length / 2, eye.y);

      if (eye.x === redEyeX) { // Red pupil eye
        line(eye.x, eye.y, eye.x + 50, eye.y);
        stroke(255, 0, 0);
        point(eye.x, eye.y);
        showButton = true; // Show button when near this eye
      }
    }
  }

  if (showButton) {
    button.show();
    button.position(redEyeX + 20, redEyeY + 20); // Ensure it's close to the red eye
  } else {
    button.hide();
  }
}

function newPage() {
  background(0);
  button.hide();

  // Shaky text effect
  let jitterX = random(-1.5, 1.5);
  let jitterY = random(-1.5, 1.5);

  fill(255);
  stroke(0);
  textSize(20);
  textAlign(CENTER, TOP);
  
  text('Do me a favor, you have to keep on. Whatever it is, DO NOT turn it off', textX + jitterX, textY + jitterY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Update positions relative to new window size
  textX = windowWidth * 0.5;
  textY = windowHeight * 0.3;
  redEyeX = windowWidth * 0.5;
  redEyeY = windowHeight * 0.5;
  
  button.position(redEyeX + 20, redEyeY + 20); // Keep button near red eye
}
```

### Effect 
- instead of jitter effect on text
- replace to button
```
 if (showButton) {
    // Add jitter to button position
    let jitterX = random(-1.5, 1.5);
    let jitterY = random(-1.5, 1.5);
    button.show();
    button.position(redEyeX + 20 + jitterX, redEyeY + 20 + jitterY); // Shake button
  } else {
    button.hide();
  }
}
```




