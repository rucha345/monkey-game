
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score,gamestate="play",survivalTime;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("addinganimation",monkey_running);
  monkey.scale=0.1;
 
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  monkey.collide(ground);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
}
function draw() {
  if(gamestate==="play"){
    background("white");
    if(ground.x<0){
      ground.x=ground.width/2;
  }
    if(keyDown("SPACE")&&monkey.y>235){
      monkey.velocityY=-10
  }
    monkey.velocityY=monkey.velocityY + 0.5
    monkey.collide(ground);
    
    spawnbananas();
    spawnobstacles();
    
    if(FoodGroup.isTouching(monkey)){ 
      FoodGroup.destroyEach();
      score=score+1
     }
    if(obstacleGroup.isTouching(monkey)){
      gamestate="end";
     }
    drawSprites();
    stroke("green");
    fill("green")
    text("Score="+score,325,30);
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time="+survivalTime,295,15)
  }
  if(gamestate==="end"){
    background("cyan");
    stroke("red");
    fill("red")
    textSize(30);
    text("You Lost",150,200); 
  }
}

function spawnbananas(){
  if(frameCount%80===0){
    banana=createSprite(200,200,1,1);
    banana.addImage("addingimage",bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(100,200));
    banana.velocityX=-2;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount%300 ===0){
    obstacle=createSprite(350,335,1,1);
    obstacle.collide(ground);
    obstacle.addImage("addingimage",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-2;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}






