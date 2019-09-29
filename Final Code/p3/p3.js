





let dataServer;
let pubKey = 'pub-c-354663ef-363e-4d34-80a8-ac41d6dddf72';
let subKey = 'sub-c-a03cbfb6-d5af-11e9-9067-a65ad2c362ff';
let channelName = "clickChannel";
let backgroundColor = 0;
let i = 0;
let z = 0;
let p = 0;
let s = 0;
let iMother= 0;
let pMother = 0;
let speed = 0;
let speedY = 0;
let speedX = 0;
let speedParry = 0;
let lungeMother = 0;
let zMother = 0;
let sMother = 0;
let actionMother = "";
let speedRound = 0;
let speedRoundP = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
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

 s;
 sendTheMessage();

 frontTilt = rotationX;
 sideTilt = rotationY;

 if (frontTilt < 45 && frontTilt > 30 && actionMother =="En Garde" ) {
  s+=0.5;
  sendTheMessage();
}

speed = pAccelerationY ;
let speedSize = map(speedY, 0, 365, 100, 500);
let speedRound = round(map(speedY, 0, 200, 0, 3));
speedY = pAccelerationY * 100;
sendTheMessage();

speedParry = pAccelerationZ ;
let speedSizeP = map(speedX, 0, 365, 100, 500);
let speedRoundP = round(map(speedX, 0, 200, 0, 3));
speedX = pAccelerationZ * 100;
sendTheMessage();

background(0, backgroundColor, 0);
fill(225,225,225);
textAlign(CENTER, CENTER);
textSize(75);
text("Player 3", width/2, 100);
fill(225,225,0);
textSize(200);
text(s, width/2, (height/2)-100);
endTheMessage();


fill(0);

textSize(50);

if (speedRound > 100 && actionMother == "Lunge"){
  speed++;
  s++;
  sendTheMessage();
}

if(speedRoundP<-100 && actionMother == "Parry"){
  s++; 
  sendTheMessage();
}
}


function sendTheMessage() {

 dataServer.publish(
 {
  channel: channelName,
  message: 
  {
   p3: s

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
   st;
   
 }
}

