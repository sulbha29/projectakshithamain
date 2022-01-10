var gameState, PLAY, END;


var boy, boy_running, boy_collided, boy_jump, boy_idle;
var bridge , bridgeImage;

var snakesGroup, snakeImage;
var coinsGroup, coinImage1, coinImage2;
var is;
var backgroundImg;
var score=0;

var gameOver, restart,ga;
var bg;


function preload(){
  boy_running=   loadAnimation("run-1.png", "run-2.png", "run-3.png", "run-4.png", 
  "run-5.png", "run-6.png", "run-7.png", "run-8.png");

  //boy_collided = loadAnimation("trex_collided.png");
  
  bridgeImage = loadImage("Bridgefinal.png");
  coinImage1 = loadImage("coin1.png")
  coinImage2 = loadImage("coin2.png")
  backgroundImg = loadImage("BG.jpg")
  snakeImage = loadImage("Snake.png")
  boy_jump = loadImage("jump.png")
  boy_idle = loadImage("idle-1.png")
}

function setup() {
  createCanvas(1500, 800);
  bg=createSprite(750,400,1500,800);
  bg.addImage(backgroundImg)
  boy = createSprite(50,300,20,50);
  boy.addAnimation("running", boy_running);
  //trex.addAnimation("collided", trex_collided);
  boy.scale = 3;
  boy.add

 PLAY = 1
 END = 0
 gameState = PLAY;

  bridge = createSprite(400,400,400,20);
  bridge .addImage("bridge",bridgeImage);
  bridge .x = bridge.width /2;
  bridge .velocityX = -5
  bridge.scale = 4
bg.velocityX=-5
  coinsGroup = new Group()
  snakesGroup = new Group()

  is = createSprite(725,325,1500,10)
  is.visible = false;

 gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
 /* invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  coinsGroup = new Group();
  
  score = 0;*/
}

function draw() {
  background(backgroundImg);
  fill("black")
  text("Score: "+ score, 500,160);

  if(gameState == PLAY){
    
    if(keyDown("space")) {
      //jumpSound.play();
      //boy.addImage(boy_jump)
  
      boy.velocityY = -6;
    
   
    }
    boy.velocityY = boy.velocityY + 1.5
    if (bridge.x < 0){
      bridge.x = bridge.width/2;
    
  }
  if (bg.x < 0){
    bg.x = bg.width/2;
  
}
    spawnCoins()
    spawnSnakes();
     
    for(var i = 0; i< coinsGroup.length; i++){
      var m = coinsGroup.get(i)
  
      if(boy.isTouching(m)){
         m.destroy()
        score = score + 1
    }  
    }
   /* for(var i = 0; i< snakesGroup.length; i++){
      var s = snakesGroup.get(i)
  
      if(boy.isTouching(s)){
       gameState = END

       reset()
    }  
    }*/
    
  }
  else if (gameState == END){
    snakesGroup.velocityXEach(0)
    coinsGroup.velocityXEach(0)
  }
  


  //createEdgeSprites()
   boy.collide(is)
   spawnSnakes()
 
  drawSprites();
}

function spawnSnakes() {
  //write code here to spawn the clouds
  if (frameCount % 230 === 0) {
    var snake = createSprite(1500,220,40,10);
  //snake .y = Math.round(random(80,120));
    snake.addImage(snakeImage);
    snake.scale = 2;
    snake.velocityX = -2;
    
     //assign lifetime to the variable
     //snake .lifetime = 200;
    
    //adjust the depth
    snake.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    //add each cloud to the group
    snakesGroup.add(snake);
  }
  
}

function spawnCoins() {
  if(frameCount % 130 === 0) {
    var coin = createSprite(1500,160,10,40);
    coin.velocityX = -6 
   // coin.addImage(coinImage1)
    //generate random coins
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: coin.addImage(coinImage1);
              break;
      case 2: coin.addImage(coinImage2);
              break;
      default: break;

    } 
    
    //assign scale and lifetime to the coin           
    coin.scale = 0.8;
    coin.lifetime = 300;
    //add each coin to the group
  coinsGroup.add(coin);
  }
}


function reset(){
  gameState = PLAY;
  bridge.velocityX = -(6 + 3*score/100);
//  gameOver.visible = false;
restart.visible = false;
  
  coinsGroup.destroyEach();
  snakesGroup.destroyEach();
  
 boy.changeAnimation("running", boy_running);
  
  score = 0;
  
}
