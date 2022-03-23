const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground2;
var ground;
var rope, rope1, rope2;
var fruit;
var fruit_con, fruit_con1, fruit_con2;
var backgroundImg, rabbit, cut, melon;
var bunny;
var boton, boton1, boton2;
var blink, eat, sad;
var music, cutSound, sadSound, eatSound, airSound, mute;
var canW, canH;

function preload(){
 backgroundImg = loadImage("background.png");
 rabbit = loadImage("Rabbit-01.png");
 cut = loadImage("cut_btn.png");
 melon = loadImage("melon.png");
 blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
 eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
 sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
 mute = loadImage("mute.png");

  music = loadSound("sound1.mp3");
  cutSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  eatSound = loadSound("eating_sound.mp3");

 blink.playing = true;
 eat.playing = true;
 sad.playing = true;
 eat.looping = false;
 sad.looping = false;
}

function setup(){
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);
  music.play();
  music.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;

  boton=createImg("cut_btn.png");
  boton.position(20,30);
  boton.size(50,50);
  boton.mouseClicked(cortar);

  boton1=createImg("cut_btn.png");
  boton1.position(330,35);
  boton1.size(50,50);
  boton1.mouseClicked(cortar1);

  boton2=createImg("cut_btn.png");
  boton2.position(360,200);
  boton2.size(50,50);
  boton2.mouseClicked(cortar2);

  ground = new Ground(200,canH,600,20);
  //ground2 = createSprite(200,640,600,20);
  //ground2.visible = false;
  rope = new Rope(10, {x:40, y:30});
  rope1 = new Rope(7, {x:370, y:40});
  rope2 = new Rope(4, {x:400, y:225});
  fruit = Bodies.circle(300,300,15);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);

  mute=createImg("mute.png");
  mute.position(420,20);
  mute.size(50,50);
  mute.mouseClicked(stopSound);

  blink.frameDelay = 15;
  eat.frameDelay = 15;
  sad.frameDelay = 15;

  bunny = createSprite(400,canH-80,100,100);
  //bunny.addImage(rabbit);
  bunny.scale = 0.2

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);
  bunny.changeAnimation("blinking");

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  textSize(50);
  
}

function draw() 
{
  background(51);
  image(backgroundImg,0 ,0 , displayWidth+80, displayHeight);
  ground.show();
  rope.show();
  rope1.show();
  rope2.show();
  //fruit.show();
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(melon,fruit.position.x,fruit.position.y,50,50);
  }
  pop();
  //console.log(fruit.position.y)
  Engine.update(engine);
  if(colision(fruit,bunny)==true){
    bunny.changeAnimation("eating");
    eatSound.setVolume(0.3);
    eatSound.play();
  }

  if(fruit!=null && fruit.position.y>610){
    bunny.changeAnimation("crying");
    music.stop();
    sadSound.setVolume(0.5);
    sadSound.play();
    World.remove(engine.world, fruit);
    fruit = null;
  }
  drawSprites();
}

function cortar(){
  rope.break();
  fruit_con.drop();
  fruit_con=null;
  cutSound.play();
}

function cortar1(){
  rope1.break();
  fruit_con1.drop();
  fruit_con1=null;
  cutSound.play();
}

function cortar2(){
  rope2.break();
  fruit_con2.drop();
  fruit_con2=null;
  cutSound.play();
}

function colision(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit);
      fruit=null;
      return true;
    }
    else{
      return false;
    }
  }
}


function stopSound(){
  if(music.isPlaying()){
    music.stop();
  }
  else{
    music.play();
  }
}
