function CreateExplosion(posX, posY){
    var canvas;
    var stage;
    var width = 5;
    var height = 5;
    var particles = [];
    var max = 10;
    var mouseX=posX;
    var mouseY=posY;
    
    var speed=5;
    var size=20;
    iterations=0;
    var timer;
    //The class we will use to store particles. It includes x and y
    //coordinates, horizontal and vertical speed, and how long it's
    //been "alive" for.
    function Particle(x, y, xs, ys) {
      this.x=x;
      this.y=y;
      this.xs=xs;
      this.ys=ys;
      this.life=0;
    }
    
    function resizeCanvas() {
      setTimeout(function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        mouseX= posX; //canvas.width/2;
        mouseY= posY; //canvas.height*0.8;
       stage.globalCompositeOperation="lighter"
      }, 0);
    }
    let tem=false;
    function init() {
      
      //Reference to the HTML element
      canvas=document.getElementById("game");
      
      resizeCanvas();
      
      //See if the browser supports canvas
      if (canvas.getContext) {
        
        //Get the canvas context to draw onto
        stage = canvas.getContext("2d");
        
        //Makes the colors add onto each other, producing
        //that nice white in the middle of the fire
        stage.globalCompositeOperation="xor";
        
        //Update the mouse position
        //canvas.addEventListener("mousemove", getMousePos);
        
        window.addEventListener("resize", function() {
          resizeCanvas();
          stage.globalCompositeOperation="lighter";
          mouseX=canvas.width/2;
          mouseY=canvas.height*0.8;
        });
        
        //Update the particles every frame
       timer=setInterval(update,20);
         
        //var sam=setInterval(clearInterval,6000);
       
        //setInterval(clearTimer,2000)
        console.log('Hello')

        
      } else {
        alert("Canvas not supported.");
      }
    }
   
    
    function getMousePos (evt) {
      var rect = canvas.getBoundingClientRect();
      var root = document.documentElement;
      stage.clearRect(0, 0, width, height);
      // return mouse position relative to the canvas
      mouseX = evt.clientX - rect.left - root.scrollLeft;
      mouseY = evt.clientY - rect.top - root.scrollTop;
      console.log('MouseX '+mouseX);
      console.log('MouseY '+mouseY)
    }
    
    function update() {
    
      //Adds ten new particles every frame
      for (var i=0; i<10; i++) {
        
        //Adds a particle at the mouse position, with random horizontal and vertical speeds
        var p = new Particle(mouseX, mouseY, (Math.random()*2*speed-speed)/2, 0-Math.random()*2*speed);
        particles.push(p);
      }
      console.log('TExt from update')
      //Clear the stage so we can draw the new frame
      stage.clearRect(250, 250, width, height);
      
      //Cycle through all the particles to draw them
      for (i=0; i<particles.length; i++) {
        
        //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
        stage.fillStyle = "rgba("+(260-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";
        
        stage.beginPath();
        //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
        stage.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
        stage.fill();
        
        //Move the particle based on its horizontal and vertical speeds
        particles[i].x+=particles[i].xs;
        particles[i].y+=particles[i].ys;
        
        particles[i].life++;
        //If the particle has lived longer than we are allowing, remove it from the array.
        if (particles[i].life >= max) {
          particles.splice(i, 1);
          i--;
        }
      }
      iterations++;
    if(iterations>5)
    {
        clearInterval(timer);
        stage.clearRect(250, 250, width, height);
    }
    }
    
    init();
    
}
