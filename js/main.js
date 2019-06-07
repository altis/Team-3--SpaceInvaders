//Global HTML Dom VAriables
var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var draw = canvas.getContext('2d');
let playerimg = new Image();
let bulletImg = new Image();
bulletImg.src = './img/Bullet.png'
playerimg.src= './img/HeroShip.png';

//-----------------------Code from Liam -- Hero------------//


let player = {
    width: 100,
    height: 100,
    x: innerWidth / 2,
    y: innerHeight - 100,
    draw(){
        draw.clearRect(this.x+1, this.y, 200, 200);
        draw.clearRect(this.x-10, this.y, 200, 200);
        if (this.x <= 0){
            this.x = 0;
        }
        else if(this.x >= (innerWidth - this.width)){
            this.x = (innerWidth - this.width)
        }
        draw.drawImage(playerimg, this.x, this.y, this.width, this.height)
    }
    
}

//Container for bullet Obj





let bulletObj = {

    
    width: 5,
    height: 20,
    counter:0,
    bulletOnScreen :[{x:0,y:0,flag:0},{x:0,y:0,flag:0},{x:0,y:0,flag:0},
                    {x:0,y:0,flag:0},{x:0,y:0,flag:0},{x:0,y:0,flag:0}
    ],
   // x: innerWidth / 2,
    //y: innerHeight - 100,
    x: 100,
    y:100,

    draw(x,y){
        //draw.clearRect(this.x+1, this.y, 200, 200);
        //draw.clearRect(this.x-10, this.y, 200, 200);
        //bulletOnScreen.push([{x:0,y:10}])
        if (this.x <= 0){
            this.x = 0;
        }
        else if(this.x >= (innerWidth - this.width)){
            this.x = (innerWidth - this.width)
        }
        draw.drawImage(bulletImg, x+50, y-20, this.width, this.height);

    }
   

}


//Adding Event Listener
addEventListener('keydown', function(event){
    
    if (event.code == "ArrowLeft"){
        player.x -= 10;
    }
    if (event.code == "ArrowRight"){
        player.x += 10;
    }
    if(event.code == "Space"){
        bulletObj.draw(player.x,player.y);
        //CreateExplosion(player.x,player.y);

    }


})
function doDraw(){
   // draw.clearRect(this.x, this.y, 100, 100);
    player.draw();
   // aliens.draw();
}


function runAnimation(){
    requestAnimationFrame(runAnimation);
    doDraw()
}
runAnimation();



//Code By Altis
class InvadersObj  {

    constructor(x, y) {
        
        //Set default width and height
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.oldTimeStamp = 0;
        this.draw(); //render the invader for first time

    }
    updatePosition() {
        this.clearPreviousFrame();

        
        if(this.x>=canvas.width)
        {
            this.x=0;
            this.y = this.y + 25
            
           
        }
        else{
            this.x += 0.5;
        }
        this.draw();


    }

    draw() {
        
        //Draw a simple square
        console.log('redraw')
       // draw.fillStyle = "red"
        var grd = draw.createLinearGradient(10, 0, 170, 0);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "green");

        draw.fillStyle = grd;
        draw.beginPath();
        draw.fillRect(this.x, this.y, 25, 5)
        draw.fillRect(this.x - 5, this.y + 5, 35, 5)
        draw.fillRect(this.x - 10, this.y + 10, 45, 5)
        draw.fillRect(this.x - 5, this.y + 15, 35, 5)
        draw.fillRect(this.x, this.y + 20, 25, 5)
    }
    clearPreviousFrame(){
        draw.clearRect(this.x-10,this.y,100,100)
       // draw.clearRect(this.x-50,this.y-50,100,100)
    }
    //Method to erase the object from canvas
    remove() {

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
class GameContainer extends InvadersObj {
    constructor() {
       super();
        this.start();
    
        this.score = 0;
        

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
       // console.log('Hello from Game Container')
        
       // console.log('MyLength ' + this.spaceInvaders.length);
        
        //setInterval(this.forwardInvaders,300)
        //setInterval(this.forwardInvaders,300)
        //window.requestAnimationFrame((timeStamp) => {this.forwardInvaders(timeStamp)});
    }

}

//Object for Invader



class heroShooter {
    constructor() {

    }
    renderHeroShooter() {

    }

    //function to reposition shooter based on key strokes
    moveHeroShooter() {

    }


}
moveInvaders=()=>{

    for(let i in spaceInvaders){
        spaceInvaders[i].updatePosition();
        console.log(i)
       
    }
    window.requestAnimationFrame((timeStamp) => {moveInvaders(timeStamp)});

}

let GameStart = new GameContainer();
GameStart.start();

//window.requestAnimationFrame((timeStamp) => {this.moveInvaders(timeStamp)});
//setInterval(moveInvaders,30);
moveInvaders();






//draw.fillRect(200,200,100,100)
//draw.fillRect(300,300,100,100)
////draw.fillRect(400,400,100,100)


//CreateExplosion(250,250);
//CreateExplosion(250,250)