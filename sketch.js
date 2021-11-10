var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg
var zombie,zombieImg
var h1,h2,h3
var h1i,h2i,h3i
var zombieGroup
var bulletGroup



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletImg= loadImage("assets/bullet.png")
  zombieImg= loadImage("assets/zombie.png")
  h1i=loadImage("assets/heart_1.png")
  h2i=loadImage("assets/heart_2.png")
  h3i=loadImage("assets/heart_3.png")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   h1=createSprite(displayWidth-300,40,20,20)
   h1.visible=false
   h1.addImage(h1i)
   h1.scale=0.4
   
   h2=createSprite(displayWidth-200,40,20,20)
   h2.addImage(h2i)
   h2.visible=false
   h2.scale=0.4

   h3=createSprite(displayWidth-150,40,20,20)
   h3.addImage(h3i)
   h3.scale=0.4

zombieGroup=new Group()
bulletGroup=new Group()

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("space")){
 
  player.addImage(shooter_shooting)
  createbullets()
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
enemy()
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
    }
  }
}
drawSprites();

}
function createbullets(){
//creating the bullet sprite 
if(frameCount %60===0){
  bullet = createSprite(player.x+50,player.y-25,20,20)
bullet.addImage(bulletImg)
bullet.scale=0.0190
bullet.velocityX=3
bulletGroup.add(bullet)
//bullet.visible=false
}

}
function enemy(){ 
  if(frameCount  %60===0){
    zombie=createSprite(random(1100,1200),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.liftime=400
    zombieGroup.add(zombie)
  }
}