var knife
var microbe1
var fruit1
var fruit2
var fruit3
var fruit4
var gameOver
var gameOver_sound
var knife_Swoosh_sound
var PLAY = 1
var END = 0
var gamestate = 1
var score
var restart_button
var HighestScore = 0
function preload(){
  
  knife = loadImage("sword.png")
  microbe1=loadImage("alien1.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  gameOver=loadImage("gameover.png")
  gameover_sound=loadSound("gameover.mp3")
  knife_Swoosh_sound=loadSound("knifeSwooshSound.mp3")
  restart_button=loadImage("1.png")
 
}

function setup(){
  createCanvas(400,400);
  sword = createSprite(40,200,20,20)
  sword.addImage(knife)
  sword.scale = 0.7
  
  fruitGroup = new Group()
  enemyGroup = new Group()
  score = 0
  restart = createSprite(200,250,20,20)
}

function draw(){
  background("lightblue")
  text("Score:"+score,300,30)
  
  
  if(gamestate == END){
    sword.addImage(gameOver)
    sword.scale = 1.75
    sword.x =200
    sword.y =175
    restart.visible = true;
    restart.addImage(restart_button)
    restart.scale = 0.15
        if(mousePressedOver(restart)){
    reset();
  }
  }
  
  if(gamestate == PLAY){
    sword.x = World.mouseX
    sword.y = World.mouseY
    restart.visible = false;
    sword.scale =0.75
    
    fruits();
    enemy();
  
    
      if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score+2
  }
 if(enemyGroup.isTouching(sword))
    {
    
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    enemyGroup.setVelocityEach (0);
    fruitGroup.setVelocityEach (0);
      gamestate = END;
  }

  }

  drawSprites();
  text("HighScore:"+HighestScore,275,40)
  
  
}

function enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20)
    monster.addImage(microbe1)
    monster.y = Math.round(random(100,300))
    monster.setLifetime = 50;
    monster.velocityX = -8
    enemyGroup.add(monster)
  }
}

function fruits(){
  if(World.frameCount%80 === 0){
    
  fruit = createSprite (400,200,20,20)
    fruit.scale = 0.2;
    //fruit.debug = true;
    r=Math.round(random(1,4));
    if(r == 1) {
      fruit.addImage(fruit1)
    }else if(r == 2){
        fruit.addImage(fruit2)
    }else if(r == 3){
        fruit.addImage(fruit3)
    }else if(r == 4){
        fruit.addImage(fruit4)
    }
       
        fruit.y = Math.round(random(50,340))
    
    fruit.setlifetime = 150
    fruit.velocityX = -7
    
    fruitGroup.add(fruit)
  }
  }
function reset ()
{
  gamestate = PLAY
  restart.visible = false;
  sword.addImage(knife)
  
  if(HighestScore<score){
    HighestScore = score
  }
  score = 0
}