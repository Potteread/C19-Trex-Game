var trex, trexrunning, trexcollided
var ground, groundimage, invisibleground
var cloud, cloudimage, CloudsGroup
var obstacle, ob1, ob2, ob3, ob4, ob5, ob6, ObstaclesGroup
var highscore = 0;
var count = 0
var x = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartimage, gameOver, gameOverImage

function preload() {
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  trexcollided = loadAnimation ("trex_collided.png")
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  restartimage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
  
}
  

function setup() {
  createCanvas(600, 200);
  trex = createSprite (60, 157, 20,  50)
  trex.addAnimation("running", trexrunning)
  trex.addAnimation("collided", trexcollided)
  trex.scale = 0.5
  
  ground = createSprite (300, 180, 600, 20)
  ground.addImage("ground", groundimage)
  ground.velocityX = -6
  
  invisibleground = createSprite (300, 190, 600, 20)
  invisibleground.visible = false
  
  CloudsGroup = new Group()
  
  ObstaclesGroup = new Group()
  
  gameOver = createSprite(300, 80);
gameOver.addImage("gameOver", gameOverImage);
gameOver.scale = 0.7;
gameOver.visible = false;

restart = createSprite(300, 130);
restart.addImage("restart", restartimage);
restart.visible = false;
  
}

function draw() {
  background(0);
  
   text("Score: "+ count, 450, 50);
  if (x==1) {
    text("High Score: "+highscore, 450, 70);
  }

  console.log (frameRate())
  
  if (gameState==PLAY){
    
  
  
  if (World.frameCount%5==0) {
      count=count+1;
      if (count%100== 0 && count >0) {
        ground.velocityX = ground.velocityX - 2;
        //playSound("checkPoint.mp3", false);
      }
    }
  
  
  if (ground.x < 0) {
    ground.x = 700
  }
  
  spawnClouds()
  spawnObstacles()
  
  if (keyDown("space") && trex.y>155) {
    trex.velocityY = -10
  }
  trex.velocityY = trex.velocityY+0.8
    
    if (trex.isTouching(ObstaclesGroup)) {
      
      //playSound("die.mp3", false);
      gameState = END;
    }
  }
  
   else if(gameState === END) {
    ground.velocityX = 0;
     trex.velocityY = 0
    trex.changeAnimation("collided", trexcollided);
    
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-2);
    
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
    
  }
  
  trex.collide (invisibleground)
  drawSprites()
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1)
        break;
      case 2: obstacle.addImage(ob2)
        break;
      case 3: obstacle.addImage(ob3)
        break;
      case 4: obstacle.addImage(ob4)
        break;
      case 5: obstacle.addImage(ob5)
        break;
      case 6: obstacle.addImage(ob6)
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset() {
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  trex.changeAnimation("running", trexrunning);
  restart.visible=false;
  gameOver.visible=false;
  if (count>highscore) {
    highscore = count;
  }
  ground.velocityX = -6;
  x=1;
  count = 0;
  gameState = PLAY;
}