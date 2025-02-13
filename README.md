# Studio-Project

- chosen theme
- idea starting off based of workshop 9 with the torch like effect but without live video
- expanding as we go

### General idea
- text
- to flash over eyes

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
- I initially changed the if function for torch range
  * as lines take up lesser surface area so it makes sense for it to be closer
  * however, it fails to reach the button which means the button disappears past the point where my cursor is at in the picture
  * so 50 remains
<img width="184" alt="image" src="https://github.com/user-attachments/assets/05e02353-90a6-4d10-9633-dafe7ca09d9b" />
- had trouble with writing the line that accounts for the array and asked ChatGPT with the prompt ""

```
for (let i = 0; i < eyes.length; i++) {
      let eye = eyes[i];
      let d = dist(mouseX, mouseY, eye.x, eye.y);
      if (d < 50) { // Only show if within torch range
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





