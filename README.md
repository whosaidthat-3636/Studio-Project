# Studio-Project

Warning: loud sounds and flashing images
Link: 

Theme: Interactivity

In this project, my aim is to create an artwork based around the theme of interactivity. My personal twist to it is the illusion of choice, creating tension with the artwork and user, forcing the user to pick options that may not be ideal. 

![Screenshot_20250218_014513_com_hihonor_notepad_NoteEditorActivity_edit_18281649757659](https://github.com/user-attachments/assets/40743a52-7ba1-4cd0-ad25-d5f75baf1d2d)

## How It Works
**mainPage**
- entirely black screen
- ellipses that is semi transparent that follows mouseXY
- at specified coordinates are different elements that appear only when mouseXY is within range
- particular element is a button referred to as "Oh you found me again"
- click on button to trigger next event

**newPage**
- stark contrast to mainPage
- white background
- right side of canvas comes down a lamp to further give off "turned on light" feel
- ON/OFF button
- screen has instructions provided for user, specifying to not click on the OFF button
- however ON button is clearly unreachable
- leading user to have no choice but to click OFF to trigger next event

**newPage2**
- images to gradually appear overlapping one another
- grain effect to develop overtime onto images
- mousePress once to have sound play (this is due browsers preventing sound from automatically playing until a user has interacted with the webpage)
- a RESTART button to appear every 500 milsecond
  * appears long enough to be seen
  * not long enough to be able to interact with
 
## Documentation
### Iteration 1
![Screenshot_20250218_014520_com_hihonor_notepad_NoteEditorActivity_edit_18300586498328](https://github.com/user-attachments/assets/4f10a032-a6d2-4e93-9b60-bd3e80c9ae9a)
![Screenshot_20250218_014527_com_hihonor_notepad_NoteEditorActivity_edit_18315077110094](https://github.com/user-attachments/assets/f32fa3a2-5a31-4365-b344-27d034add741)

- eyes using ellipses
- torch over to appear
- button pressed to change into white background

#### Torch
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

#### Eyes
- writing individual
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

#### Button
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
- creating an array for the ellipses rather than individually writing code which shouldve been done before 
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

### Iteration  2
#### Line
- changing ideas
- replacing ellipses with line
- lines could be considered eyes shut
- ellipses that act as "torch" remains
- I initially changed the value for the if function for torch range
  * as lines take up lesser surface area so it makes sense for it to be closer
  * however, it fails to reach the button which means the button disappears past the point where my cursor is at in the picture therefore altered to 55 for it to be easily used
<img width="184" alt="image" src="https://github.com/user-attachments/assets/05e02353-90a6-4d10-9633-dafe7ca09d9b" />

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
```

#### New button condition
- text to jitter like in workshop 7
```
let font1;

let textX = 210;
let textY = 100;

function preload() {
  font1 = loadFont('who asks satan.ttf');}

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

#### Window resize
- asking ChatGPT to help update object position to work with window resize
```
function setup() {
  createCanvas(windowWidth, windowHeight);

 let eyes = [
    { x: width * 0.1, y: height * 0.15, length: 95 },
    { x: redEyeX, y: redEyeY, length: 100 }, // Red pupil eye
    { x: width * 0.75, y: height * 0.3, length: 110 }
  ];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  textX = 20;  
  textY = 20;
  redEyeX = windowWidth * 0.5;
  redEyeY = windowHeight * 0.5;
  
  button.position(redEyeX + 20, redEyeY + 20); 
}
```

### Final
![Screenshot_20250218_014537_com_hihonor_notepad_NoteEditorActivity_edit_18336372789617](https://github.com/user-attachments/assets/4a117b84-3797-491a-9661-918bbd2efd3a)

### Updating even newer condition
- jitter effect onto mainPage on button
```
if (showButton) {
    // Add jitter to button position
    let jitterX = random(-1.5, 1.5);
    let jitterY = random(-1.5, 1.5);
    button.show();
    button.position(redEyeX + 20 + jitterX, redEyeY + 20 + jitterY); // Shake button
  } else {
    button.hide();
```

### NewPage
- I felt like I wasn't putting enough effort into creating a jarring and restricting experience I had in mind so going for a different approach
- switching to white background and lamp object to feel like user has turned on light
- instruction that supposedly guides users
```
function newPage() {
  background(255, 255, 255);
  button.hide(); 

  drawLamp();

  fill(0);
  stroke(0); 
  strokeWeight(1);
  textSize(16); 
  textAlign(LEFT, TOP);  
  
  text('Since you are here do me a favour, you have to it keep on.', textX, textY);
  text('Whatever it is, DO NOT turn it off.', textX, textY + 30);

  button = createButton('OFF');
  button = createButton('Keep On');
  button.position(340, 710);
}

function drawLamp() {
  let lineX = windowWidth - 40; 
  
  strokeWeight(3); 
  stroke(255, 255, 0); 
  line(lineX, 0, lineX, height);

  noFill(); 
  beginShape();
  vertex(lineX - 15, height); // Left point of the triangle
  vertex(lineX + 15, height); // Right point of the triangle
  vertex(lineX, height - 30); // Top point of the triangle (at the line end)
  endShape(CLOSE);

  //curved bottom edge
  stroke(255, 255, 0); 
  noFill(); 
  arc(lineX, height, 30, 30, 0, PI);
  //glow effect
  fill(255, 255, 0, 100);  
  noStroke(); 
  ellipse(lineX, height - 30, 80, 80); 
}
```
### The Button Saga
#### Beginning 
- something interesting popped up before I placed any condition for the buttons
- this occured as I hadn't put down a specific button position
- liked the idea and wanted to continue with it to give a sense of overwhelm
<img width="748" alt="image" src="https://github.com/user-attachments/assets/3ba8d41a-8845-4d82-a431-652362bbde37" />

#### Adding condition
![Notepad_202502180917_52269](https://github.com/user-attachments/assets/121bceca-fe0f-48c4-99f3-a646fd393083)
- inspo for it [https://github.com/ivysone/Will-you-be-my-Valentine-]
- attempted to follow but it didnt work at all
- and when it did the rows and rows of ON buttons would disappear having only one ON button which wasn't ideal

#### Foregoing intial idea
- improvised because it felt stale to continue only having one button
- have ON button scattered on canvas but having a high framerate so its basically impossible to click
- OFF button blatantly obvious but added text just in case user believed that was it
```
fill(255, 255, 255, 250);
  text('You know what you have to do...', textX, textY + 500);

function showRandomButton(button) {
  let randomX = random(50, width - 150);
  let randomY = random(50, height - 80);
  button.position(randomX, randomY);
  button.show();
}
```

### Last page
- the idea was to have images i found replicate similar effects i did for my workshop 3
- sound will loop in the back
- i wrote it in a seperate sketch because my code was getting overwhemling
- no major issues with writing it 
- i later expanded with adding grain effects and to let the images gradually be on canvas rather than all in one go for a smoother effect
- the biggest problem i faced was only getting this part, it was really hard for me to articulate how to integrate the code
- based on the valentine button inspo there was an option that took users to a different page but as I looked further into it, it had to be an html file which I wasn't sure how to go about so I had to just combine them
- alot of trial and error with order of operations
```
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

function newPage2() {
  background(255);
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
```

### Housekeeping
- after integrating and the code working for the most part
- there were some overlapping parts not where they were meant to be and made necessary changes to have my proper final outcome

## Final reflection
I am somewhat satisfied with my outcome but acknowledge there so much more that could be done. I paid the least attention to the mainPage so it does fall a bit flat in terms of experience. The troubles I faced were frustrating because it is either I had forgotten to add in something that causes the whole thing to be defective or the order of operations. I am entirely lost when it comes to window width height and how to write so that the elements will follow suit by the window size. Another problem was putting all the code together. Maybe I should have been a lot more flexible with my ideas because I might have put myself in a box and refusing to let ogo. Other than that, it was a learning experience to say the least. 











