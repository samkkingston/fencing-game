
let dataServer;
let pubKey = 'pub-c-354663ef-363e-4d34-80a8-ac41d6dddf72';
let subKey = 'sub-c-a03cbfb6-d5af-11e9-9067-a65ad2c362ff';
let channelName = "clickChannel";
let speedParry = 0;
let lungeMother = 0;
let actionMother = "";
let pMother = 0;
let iMother = 0;
let sMother = 0;
let timer = 10;
let randomChoice = 0;
let round = 0;
let lungeimg;
let parryimg;
let engardeimg;
var leftimg;
var rightimg;



function setup() {

  createCanvas(windowWidth, windowHeight);
  leftimg = loadImage('assets/left.png');
  rightimg = loadImage('assets/right.png');

  lungeimg = loadImage('assets/lunge.png');
  parryimg = loadImage('assets/parry.png');
  engardeimg = loadImage('assets/engarde.png');

  dataServer = new PubNub(
  {
    publish_key   : pubKey, 
    subscribe_key : subKey,  
    ssl: true  
  });

  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});



}

function draw() {

  background(75,75, 75);
  fill(225,225,225);
  rect(0,0,width, height*0.5)
  fill(75,75,75);
  stroke(0,0,0);
  strokeWeight(5);
  rect((width/2)-150, height/20, 300,100);
  strokeWeight(0);

  imageMode(CENTER);
  image(leftimg, width*0.2,height/2.25, leftimg.width/2.5, leftimg.height/2.5);
  image(rightimg, width*0.8,height/2.25, rightimg.width/2.5, rightimg.height/2.5);

  textAlign(CENTER, CENTER);
  fill(225,0,0);

  text(timer, width/2, height/20+60);

  fill(225,0,225);

  text(pMother, width*0.8, (height/1.5));
  text(iMother, width*0.2, (height/1.5));
  text(sMother, width/2, height/1.5);

  fill(225,225,225);

  text(randomChoice, width/2, height/3);
  
  sendTheMessage();
  fill(0);
  textSize(50);
  counter();
  fill(0,0,0); 

  if(round>5){
    gameOver();
  }

  if(randomChoice=="Lunge" && round<=5){
    image(lungeimg, width/2,height/3+100, lungeimg.width/3, lungeimg.height/3);
  }
  if(randomChoice=="Parry" && round<=5){
    image(parryimg, width/2,height/3+100, parryimg.width/3, parryimg.height/3);
  }
  if (randomChoice=="En Garde" && round<=5){
    image(engardeimg, width/2,height/3+100, engardeimg.width/3, engardeimg.height/3);
  }
}



function counter(){
 
	if (frameCount % 60 == 0 && timer > 0) { 
    timer --;
  }

  if (timer == 0) {
    timer =4;
    round++;
    pickAction();
  }
}



function gameOver(){
  timer = "GAME OVER";
  randomChoice == "0";
  
  textSize()
  fill(0,255,0);
  
  if(pMother>iMother && pMother> sMother){
    text("Player 2 Wins!", width/2, height*0.7+75);
  }
  if(sMother>iMother && sMother> pMother){
    text("Player 3 Wins!", width/2, height*0.7+75);
  }
  if(iMother>pMother && iMother> sMother){
    text("Player 2 Wins!", width/2, height*0.7+75);
  }
}



function pickAction(){
  let words = ['Parry', 'En Garde', 'Lunge'];
  randomChoice = random(words);
  sendTheMessage();
}


function sendTheMessage() {
  dataServer.publish(
  {
    channel: channelName,
    message: 
    {
     
     rc: randomChoice
   }
 });
}



function readIncoming(inMessage){ 

  if(inMessage.channel == channelName)
  {
    iMother = inMessage.message.sl;
    pMother = inMessage.message.p2; 
    sMother = inMessage.message.p3;
    actionMother = inMessage.message.rc; 
    
  }
}

