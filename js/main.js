//Global HTML Dom VAriables
var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var draw = canvas.getContext('2d');

class InvadersObj  {

    constructor(x, y) {
        
        //Set default width and height
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.draw(); //render the invader for first time

    }
    updatePosition() {
        this.clearPreviousFrame();
        this.x += 5;
        //this.y += 5;
        this.draw();
    }

    draw() {
        //Draw a simple square
        console.log('redraw')
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
}

let GameStart = new GameContainer();
GameStart.start();


setInterval(moveInvaders,30);
//moveInvaders();






//draw.fillRect(200,200,100,100)
//draw.fillRect(300,300,100,100)
////draw.fillRect(400,400,100,100)


//CreateExplosion(250,250);
//CreateExplosion(250,250)