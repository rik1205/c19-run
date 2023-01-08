var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost
var pacman
var ghost1
var ghost2
var floor
var floorImage
var invisibleFloor
var cloudsGroup, cloudImage;
var ghostGroup
var score;


function preload() {

  floorImage = loadImage("flor.jpg");

  cloudImage = loadImage("cloud.png");

  ghost1 = loadImage("ghost1.png");
  ghost2 = loadImage("ghost2.png");


}

function setup() {
  createCanvas(600, 200);



  pacman = createSprite(50, 160, 20, 50);
  pacman.scale = 0.5;

  floor = createSprite(200, 180, 400, 20);
  floor.addImage("flor", floorImage);
  floor.x = floor.width / 2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  ghostsGroup = createGroup();
  cloudsGroup = createGroup();

  pacman.setCollider("rectangle", 0, 0, pacman.width, pacman.height);
  pacman.debug = true

  score = 0;

}

function draw() {

  background(180);

  text("Score: " + score, 500, 50);


  if (gameState === PLAY) {



    floor.velocityX = -(4 + 3 * score / 100)

    score = score + Math.round(getFrameRate() / 60);

    if (score > 0 && score % 100 === 0) {

    }

    if (floor.x < 0) {
      floor.x = floor.width / 2;
    }

    if (keyDown("space") && pacman.y >= 100) {
      pacman.velocityY = -12;

    }

    pacman.velocityY = pacman.velocityY + 0.8


    spawnClouds();


    spawnGhosts();

    if (ghostsGroup.isTouching(pacman)) {


      gameState = END;

    }
  } else if (gameState === END) {



    floor.velocityX = 0;
    pacman.velocityY = 0



    ghostsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    ghostsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  
  pacman.collide(invisibleGround);

 // if (mousePressedOver(restart)) {
  //  reset();
//  }


  drawSprites();
}

function reset() {


}


function spawnGhosts() {
  if (frameCount % 60 === 0) {
    var ghost = createSprite(600, 165, 10, 40);
    ghost.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        ghost.addImage(ghost1);
        break;
      case 2:
        ghost.addImage(obstacleghost)
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    ghost.scale = 0.5;
    ghost.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = pacman.depth;
    pacman.depth = pacman.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}