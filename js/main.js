//Global HTML Dom VAriables
var canvas = document.querySelector('canvas');
var scoreBoard = document.getElementById(`score`)
var levelBoard = document.getElementById('level')
var lifeCanvas = document.getElementById ('diplayLife')
console.log(lifeCanvas)
//scoreBoard.innerHTML = "Hello"
canvas.height = window.innerHeight;
canvas.width = window.innerWidth-300;
lifeCanvas.width = 150;
lifeCanvas.height = 100;

var draw = canvas.getContext('2d');
var drawLife = lifeCanvas.getContext('2d');
let playerimg = new Image();
let bulletImg = new Image();
bulletImg.src = './img/Bullet.png'
playerimg.src= './img/HeroShip.png';
score = 0;
level=1;

levelBoard.innerHTML = level;
//-----------------------Code from Liam -- Hero------------//
let player = {
    width: 100,
    height: 50,
    x: innerWidth / 2,
    y: innerHeight - 100,
    draw(){
        //draw.clearRect(this.x+1, this.y, 200, 200);
        //draw.clearRect(this.x-10, this.y, 200, 200);
        draw.clearRect(this.x+60, this.y-20, 20, this.height)
        draw.clearRect(this.x+20, this.y-20, 20, this.height)
        draw.clearRect(this.x+11, this.y+40, this.width, this.height);
        draw.clearRect(this.x-11, this.y+40, this.width, this.height);
        draw.clearRect(this.x+21, this.y+30, 80, 10)
        draw.clearRect(this.x-11, this.y+30, 80, 10)
        
        if (this.x <= 0){
            this.x = 0;
        }
        else if(this.x >= (innerWidth - this.width)){
            this.x = (innerWidth - this.width)
        }
        //draw.drawImage(playerimg, this.x, this.y, this.width, this.height)
        draw.fillRect(this.x, this.y+40, this.width, this.height);
        draw.fillRect(this.x+10, this.y+30, 80, 10)
        draw.fillRect(this.x+40, this.y-20, 20, this.height)
    }
}
//Code By Altis

class InvadersObj  {
    constructor(x, y) { 
        //Set default width and height
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.oldTimeStamp = 0;
        this.draw(); //render the invader for first time

    }
    updatePosition() {
        this.clearPreviousFrame();
        if(this.x>=canvas.width){
            this.x=0;
            this.y = this.y + 25  
        }
        else
            this.x += 0.5;
        this.draw();
    }
    draw() {
        var grd = draw.createLinearGradient(10, 0, 170, 0);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "pink");

        draw.fillStyle = grd;
        draw.beginPath();
        draw.fillRect(this.x, this.y, 25, 5)
        draw.fillRect(this.x - 5, this.y + 5, 35, 5)
        draw.fillRect(this.x - 10, this.y + 10, 45, 5)
        draw.fillRect(this.x - 5, this.y + 15, 35, 5)
        draw.fillRect(this.x, this.y + 20, 25, 5)
    }
    clearPreviousFrame(){
        draw.clearRect(this.x-10,this.y,25,25)
    }
}
class spaceInvaders{

    constructor(x, y) {
        //Set default width and height
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
    }
}

spaceInvaders = [];
var bulletOnScreen=[];
var maxBullet = 8;
class GameContainer extends InvadersObj {
    constructor() {
       super();
        this.start();
    }
    start() {
       spaceInvaders = [new InvadersObj(100, 100),
            new InvadersObj(170, 100),
            new InvadersObj(240, 100),
            new InvadersObj(310, 100),
            new InvadersObj(100, 150),
            new InvadersObj(170, 150),
            new InvadersObj(240, 150),
            new InvadersObj(310, 150)
        ];
        //window.requestAnimationFrame((timeStamp) => {this.forwardInvaders(timeStamp)});
    }

}
//Object for Invader
collisionDetect=(x1,y1,w1,h1,x2,y2,w2,h2)=>{
   return x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2 ? false : true
}
nextFrame=()=>{
    for(let spaInv in spaceInvaders)
        spaceInvaders[spaInv].updatePosition();
    for (let bulOnScr in bulletOnScreen){
        for(let spaInv in spaceInvaders){
          if(collisionDetect(spaceInvaders[spaInv].x,spaceInvaders[spaInv].y,spaceInvaders[spaInv].width,spaceInvaders[spaInv].height,
                bulletOnScreen[bulOnScr].x,bulletOnScreen[bulOnScr].y,5,5) ){ 
                draw.clearRect(spaceInvaders[spaInv].x-10,spaceInvaders[spaInv].y,45,45);
                //draw.clearRect(0,0,canvas.width,canvas.height)
                spaceInvaders.splice(spaInv,1);
                draw.clearRect(bulletOnScreen[bulOnScr].x,bulletOnScreen[bulOnScr].y, 6, 6)
                bulletOnScreen.splice(bulOnScr,0)
                score+=10;
                scoreBoard.innerHTML = score;
                //CreateExplosion(bulletOnScreen[bulOnScr].x,bulletOnScreen[bulOnScr].y)
                //break;
            }
        }
        draw.clearRect(bulletOnScreen[bulOnScr].x, bulletOnScreen[bulOnScr].y, 6, 6)
        if (bulletOnScreen[bulOnScr].y-=1)
        draw.fillRect(bulletOnScreen[bulOnScr].x,bulletOnScreen[bulOnScr].y,5,5)
        else bulletOnScreen.splice(bulOnScr,1)   
    }
    player.draw();
    renderLife();
   window.requestAnimationFrame(nextFrame) //((timeStamp) => {nextFrame(timeStamp)});
   // setInterval(nextFrame,100)
}
renderLife=()=>{
    var x = 5, y=5;
    
    drawLife.clearRect(0,0,150,100);
    for(n=0;n<maxBullet-bulletOnScreen.length;n++){
        drawLife.fillRect(x,y,5,5)
        x+=20;
    }
    //console.table(bulletOnScreen)
}

//Adding Event Listener
addEventListener('keydown', function(event){

    if (event.code == "ArrowLeft")
        player.x -= 10;
    if (event.code == "ArrowRight")
        player.x += 10;
    if(event.code == "Space"){
        //bulletObj.draw(player.x,player.y);
        if(bulletOnScreen.length<maxBullet){
        bulletOnScreen.push({x:player.x+50,y:player.y-10})
        draw.fillRect(player.x+50,player.y-10, 5, 5)
        }
        //console.log(bulletOnScreen)
    }
})
let GameStart = new GameContainer();
GameStart.start();

//window.requestAnimationFrame((timeStamp) => {this.moveInvaders(timeStamp)});
//setInterval(moveInvaders,30);
nextFrame();