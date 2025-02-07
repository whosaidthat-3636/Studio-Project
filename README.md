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

## Torch
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

## Eyes
- writing individual
- i acknowledge that this could've been written in an array however this works for me as opposed to an array
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




