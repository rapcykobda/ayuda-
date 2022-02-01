
var sadto;
var mudio;
var chechoint;
var Restart;
var FIN;
var Restart2;
var FIN2;
var END=0;
var PLAY=1;
var gamestate=PLAY;
var trex;
var trex_running;
var trex_died;
var bordes;
var suelo;
var suelo2;
var inv;
var nube;
var nube2;
var nubesjuntas;
var cactus;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactusjuntos;
var score=0
 function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_died=loadAnimation("trex_collided.png");
FIN=loadImage("gameOver.png");
Restart=loadImage("restart.png");
suelo2=loadImage("ground2.png");
nube2=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");
sadto=loadSound("jump.mp3");
chechoint=loadSound("checkpoint.mp3");
mudio=loadSound("die.mp3");
}
function setup()
{
 createCanvas(600,200);
 FIN2=createSprite(300,100,10,10)
 Restart2=createSprite(300,150,10,10)
 inv=createSprite(300,198,600,5);
 inv.visible=false;
 suelo=createSprite(300,195,600,5);
 suelo.addImage(suelo2);
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running",trex_running,);
 trex.addAnimation("died",trex_died,);
 trex.scale=0.7;
 bordes=createEdgeSprites();
 var Z
 Z=Math.round(random(1,947))
 console.log(Z)
 cactusjuntos=new Group();
 nubesjuntas=new Group();
 trex.setCollider("circle",0,0,40);
 //trex.debug=true;
 FIN2.addImage(FIN);
 Restart2.addImage(Restart);
 FIN2.scale=0.5;
 Restart2.scale=0.5;
 FIN2.visible=false;
 Restart2.visible=false;

}
function draw()
{
 background("white");
 




 
 if(gamestate==PLAY)
 {
    suelo.velocityX=-(5+3*(score/100));
    if(keyDown("space")&&trex.y>=150)
    {
     trex.velocityY=-13;
     sadto.play();
    }
    if(suelo.x<0)
    {
     suelo.x=300
   
    }
    trex.velocityY=trex.velocityY+1;
    score=Math.round(getFrameRate()/55)+score
    cloud();
    CACTUS();
    if(cactusjuntos.isTouching(trex)){
        gamestate=END
        mudio.play();
        FIN2.visible=true;
        Restart2.visible=true;
        }
    if(score>0&&score%100==0){
     chechoint.play();

    }
 }
 
  else if(gamestate==END)
  {

   suelo.velocityX=0;
   cactusjuntos.setVelocityXEach(0);
   nubesjuntas.setVelocityXEach(0);
   trex.velocityY=0
   trex.changeAnimation("died",trex_died);
   cactusjuntos.setLifetimeEach(-1)
   nubesjuntas.setLifetimeEach(-1)
   if(mousePressedOver(Restart2)){
    RESET();
   }
   textSize(12);
   text("score "+score,20,20);
 


 

  trex.collide(bordes[3]);
   drawSprites();

 }
 function cloud ()
{ 
    if(frameCount%80==0)
    {
     nube=createSprite(550,100,15,12.5);
     nube.velocityX=-5;
     nube.lifetime=150;
     nube.y=Math.round(random(10,100));
     nube.addImage(nube2);
     nube.depth=trex.depth;
     trex.depth=trex.depth+1
     nubesjuntas.add(nube)
    }
}
    function CACTUS()
{   if(frameCount%100==0)
    {
        cactus=createSprite(600,177,5,15);
        cactus.scale=0.5
        cactus.velocityX=-(8+3*(score/100));
     var rand=Math.round(random(1,6))   
     cactus.lifetime=75;
     cactusjuntos.add(cactus)
     switch(rand)
     {
      case 1 : cactus.addImage(cactus1);
      break;
      case 2 : cactus.addImage(cactus2);
      break;
      case 3 : cactus.addImage(cactus3);
      break;
      case 4 : cactus.addImage(cactus4);
      break;
      case 5 : cactus.addImage(cactus5);
      break;
      case 6 : cactus.addImage(cactus6);
      break;
      default:break;
      
     }

                                                           
    }      
    



}
 function RESET()
 {
  gamestate=PLAY
  Reset2.visible=false
  FIN2.visible=false
  cactusjuntos.destroyEach();
  nubesjuntas.destroyEach();
  score=0
 }
 