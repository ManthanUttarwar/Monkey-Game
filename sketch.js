// Global var
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime = 0;
var bananaeaten = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
  
   monkey = createSprite(100,270,20,50) 
   monkey.addAnimation("monkey",monkey_running)
   monkey.scale = 0.1
 
  ground = createSprite(400,290,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("white")
  
  if(keyDown("space") && monkey.y>=250)
  {
    monkey.velocityY = -15;  
  } 
  
  textSize(20);
  fill("green")
  survivaltime = Math.ceil(frameCount/frameRate())
  text("SurvivalTime :" +survivaltime, 50,50)
  text("Banana Eaten :"+bananaeaten,220,50)
  
  if(ground.x<0)
    {
      ground.x = ground.width/2;
    }

  monkey.velocityY = monkey.velocityY+0.8;

  if(monkey.isTouching(FoodGroup))
    {
      FoodGroup.destroyEach();
      bananaeaten = bananaeaten+1;
    }  
  
  if(monkey.isTouching(obstacleGroup))
    {
       reset();
    } 
  
  spawnfood();
  spawnobstacle(); 
  
  monkey.collide(ground)
  drawSprites();
}


function spawnfood()
{
  if(frameCount % 80===0)
  {
     banana = createSprite(400,400,10,10)
     banana.y = Math.round(random(120,200))
     banana.addImage(bananaImage)
     banana.scale = 0.08;
     banana.velocityX = -4;
     banana.lifetime = 300;
     FoodGroup.add(banana);
  } 
}

function spawnobstacle()
{
   if(frameCount % 300===0) 
   {
     var stone = createSprite(450,250,20,02) 
     stone.velocityX = -4;
     stone.addImage(obstaceImage)
     stone.lifetime = 300;
     stone.scale = 0.3;
     obstacleGroup.add(stone)
   } 
}   

function reset()
{
  survivaltime=0;
  bananaeaten = 0;
  monkey.x = 100;
  monkey.y = 270;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
} 