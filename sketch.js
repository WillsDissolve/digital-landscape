let webcam;
let img;
let sound;
let previousButtons =[];

function preload(){
img = loadImage('/v3/BG Small.jpeg');
sound = loadSound('/sound/choice.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  image(img,windowWidth,windowHeight);
  //sound = loadSound('media/loop.mp3');
  //sound = await loadSound('/sound/choice.wav');
  webcam = createCapture(VIDEO);
  webcam.size(640,480);
  webcam.hide(); //hide default vid element outside canvas
  noFill();
  stroke('black');
  strokeWeight(20);
}

//function preload(){
  //background = loadImage("BG.JPG");
//}

function draw(){ 
  //background("BG.JPG");
push();
  image(webcam, 325,100);
  width = 20;
pop();
  noFill();
  stroke('gray');
  strokeWeight(40);
  rect(300,70,690,545);
  
  //fill('black');
  //stroke('black');
  //strokeWeight(5);
  //rect(325,100,640,480);
  


  // make instructions when no controller connected
  let gp = navigator.getGamepads()[0];
  if(!gp){
    fill(0);
    stroke('white');
    strokeWeight(2.5);
    textSize(24);
    text("Peripheral required for hesitant tolerance.", width/3.1, height/1.1);
    return;
  }
  
  handleButtons(gp);
}

function handleButtons(gp){
  gp.buttons.forEach((button,index) => {
    let currentlyPressed = button.pressed;
    let previouslyPressed = previousButtons[index] || false;
    
    //newly pressed
    if(currentlyPressed){
      switch(index){
          
          //A
        case 0:
          filter(THRESHOLD);
          sound.play();
         break;
          
          //B
        case 1:
          filter(POSTERIZE, 3);
          //sound.play();
          break;
        
          //X
        case 2:
           filter(BLUR);
           //sound.play();
          break;
          
          //Y
        case 3:
          filter(GRAY);
          //sound.play();
          break;

          //LEFT SHOULDER
        case 4:
          webcam.size(700,525);
          webcam.position(325,100);
          break;

            //RIGHT SHOULDER
        case 5:
          webcam.size(640,480);
          webcam.position(325,100);
          break;
      }
      
    }
    previousButtons[index] = currentlyPressed;
    
  });
}
