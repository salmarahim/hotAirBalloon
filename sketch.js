var balloon, database;
var height;
var bgimg,balloonimg;

function preload(){
  bgimg=loadImage("back.png");
  balloonimg=loadImage("balloon.png");
}

function setup(){
  database = firebase.database();
  createCanvas(500,500);

  balloon = createSprite(250,250,10,10);
  //balloon.shapeColor = "red";
  balloon.addImage("b",balloonimg);
  balloon.scale=0.3;


  var balloonPosition = database.ref('ball/height');
  balloonPosition.on("value", readHeight, showError);
}

function draw(){
  background(bgimg);
  
    if(keyDown(LEFT_ARROW)){
      updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,+1);
    }
    drawSprites();
  
}

function updateHeight(x,y){
  database.ref('ball/height').set({
    'x': balloon.x + x ,
    'y': balloon.y + y
  })
  
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}