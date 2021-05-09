var player; 
var enemy;

var gamestate = 0;
var health = 100;
var score = 0;
var invisibleWall1;
var invisibleWall2;
var invisibleWall3;
var invisibleWall4;

var Enemygroup;

var EnemyImg1;
var EnemyImg2;
var EnemyImg3;

var pointImage;
var point;
var pointScore = 0;
var pointGroup;
 var backgroundimg;
 var playerImg;
function preload()
{
EnemyImg1 = loadImage("Enemy1.png");
EnemyImg2 = loadImage("Enemy2.PNG");
EnemyImg3 = loadImage("Enemy3.PNG");
pointImage = loadImage("Point.png");
playerImg = loadImage("Player.png");
backgroundimg = loadImage("Background.jpg");
}
function setup() {
  createCanvas(displayWidth,displayHeight-72 );
  Enemygroup = new Group();
  player = createSprite(400,300,50,50);
  player.addImage(playerImg);
  player.scale = 0.25
  
 pointGroup = new Group();

 invisibleWall1 = createSprite(10,5,10,5000)
 invisibleWall1.visible = false;

 invisibleWall2 = createSprite(10,5,5000,10)
 invisibleWall2.visible = false;
 
 invisibleWall3 = createSprite(1250,5,10,5000)
 invisibleWall3.visible = false;
 
 invisibleWall4 = createSprite(1250,5,5000,10)
 invisibleWall4.visible = false;
}

function draw() {
  background(backgroundimg);  
  

 Enemygroup.bounceOff(invisibleWall1);
 Enemygroup.bounceOff(invisibleWall2);
 Enemygroup.bounceOff(invisibleWall3);
 Enemygroup.bounceOff(invisibleWall4);
 player.collide(invisibleWall1);
 player.collide(invisibleWall2);
 player.collide(invisibleWall3);
 player.collide(invisibleWall4);

 if(gamestate===0){
   fill("white")
   textSize(30)
   textFont("arian");
   pointGroup.destroyEach();
   text("ARROW KEYS FOR MOVEMENT ",displayWidth/2-120,displayHeight/2-50);
   text("HOLD SPACE TO DESTROY YOUR ENEMY ",displayWidth/2-120,displayHeight/2-20);
   text(" PRESS SPACE TO START ",displayWidth/2-120,displayHeight/2+10);
   player.visible = false;
   if(keyDown("space")&&gamestate==0){
      gamestate = 1;
      
    
   }
 }

  if(gamestate===1)
  {
    player.visible = true;  
    if(frameCount%90===0)
    {
      score = score+1
    }
    
    textSize(20);
 fill("white")
 textFont("arian");
 text("Health:"+health,1050,50)
 text("Score:"+score,500,50);
 text("Points : "+pointScore,350,50)
    if(keyDown("up")||keyDown("w"))
  {
    player.y = player.y-10;
  }
  if(keyDown("down")||keyDown("s"))
  {
    player.y = player.y+10;
  }
  if(keyDown("left")||keyDown("a"))
  {
    player.x = player.x-10;
  }
  if(keyDown("right")||keyDown("s"))
  {
    player.x = player.x+10;
  }
  if(Enemygroup.isTouching(player)&&keyDown("space"))
  {
    Enemygroup.destroyEach();
  }
  if(Enemygroup.isTouching(player))
  {
    Enemygroup.destroyEach();
    health = health-10;
  }
  if(pointGroup.isTouching(player)){
    pointScore = pointScore + 1;
    health = health+1;
    pointGroup.destroyEach();
  }
  

  if(frameCount%360===0){
    spawnPoint();
  }
  
  
  if(score>0&&frameCount%200===00){
  spawnEnemy();
  }
  if(score>10&&frameCount%180===0)
  {
      spawnEnemy();
  }
  if(score>20&&frameCount%160==0){
   spawnEnemy();
  }
  if(score>30&&frameCount%140){
    spawnEnemy();
  }
  
  
  }
 

 if(gamestate===2){
  fill("White");
  textFont("arian");
   textSize(50)
   text("Game Over",displayWidth/2,displayHeight/2);
   text("Press R to restart",displayWidth/2,displayHeight/2-50);
   player.visible = false;
   score.visible = false;
   health.visible = false;
  
  
 }
 if(health<1&&gamestate===1){
  gamestate = 2
}
 if(keyDown("r")&&gamestate===2){
  gamestate = 0 ;
  player.visible = true;
  score.visible = true;
  health.visible = true;
  health = 100;
  score = 0;
  pointScore = 0;
}
 
 drawSprites();

}

function spawnEnemy(){
    enemy = createSprite(500,500,50,50);
    enemy.x = Math.round(random(100,500));
    enemy.y = Math.round(random(50,250));
    enemy.velocityX = 10;
    enemy.velocityY = 5;
    Enemygroup.add(enemy);
    enemy.scale = 0.3;
    
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: enemy.addImage(EnemyImg1);
             
              break;
      case 2: enemy.addImage(EnemyImg2);
      EnemyImg2.scale = 0.5;
              break;
      case 3: enemy.addImage(EnemyImg3);
      EnemyImg3.scale = 0.5;
              break;
      default: break;
    }
}
function spawnPoint(){
  point = createSprite(20,20,50,50);
  point.scale = 0.25;
  point.addImage(pointImage);
  point.x = Math.round(random(100,500));
  point.y = Math.round(random(50,250));
  pointGroup.add(point);
  point.lifetime = 300;
}



