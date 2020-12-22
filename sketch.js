
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;
var score = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function food(){
  if(frameCount%80===0){
    banana = createSprite(610,random(160,240),20,20)
    banana.velocityX = -7
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.lifetime = 85.71428571428571
    
    FoodGroup.add(banana);
    
    //setting collider radius
    banana.setCollider("rectangle",0,0,500,300)
  }
}

function obstacles(){
  if(frameCount%150===0){
    obstacle = createSprite(610,330,20,20)
    obstacle.velocityX = -7;
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.1
    obstacle.lifetime = 85.71428571428571
    
    obstacleGroup.add(obstacle);
  }
}

function setup() {
  createCanvas(600,400);
  
  //creating monkey sprite
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("collided",monkey_collided)
  monkey.scale = 0.1
  
  //creating ground sprite
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2
  
  //declaring groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //monkey.debug = true
  monkey.setCollider("rectangle",0,0,300,500)
  
}


function draw() {
  background("black");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: "+survivalTime,100,50)
  
  if(ground.x<200){
    ground.x = width/2;
  }
  
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
  
  
  monkey.velocityY = monkey.velocityY+1.5;
  
  
  monkey.collide(ground);
  
  if(monkey.isTouching(obstacleGroup)){
    reset();
  }else {
    food();
    obstacles();
    survivalTime = Math.ceil(frameCount/frameRate())
    
    //jumping monkey when space key is pressed
    if(keyDown(" ") && monkey.y>314){
      monkey.velocityY = -20;
    }
  }
  
  
  drawSprites();
}

function reset(){
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  monkey.changeAnimation("collided",monkey_collided)
  monkey.velocityY = 0
}




