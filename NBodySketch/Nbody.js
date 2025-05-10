class Sphere{
    constructor(x,y){
      this.x = x
      this.y = y
      this.velX = randomGaussian(0,initialVel)
      this.velY = randomGaussian(0,initialVel)
      this.h = randomGaussian(250,30)
      }
  
    show(){
      fill(this.h,90,90)
      ellipse(this.x,this.y,diameter)
      }
  
    update(){    
      this.x += this.velX
      this.y += this.velY
      }
  
   attractCollide(){
  for (let i = 0; i < spheres.length; i++){
    const other = spheres[i];
    if (other === this) continue;

    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const d  = sqrt(dx*dx + dy*dy);

    if (d > diameter){
      this.velX -= dx * grav;
      this.velY -= dy * grav;
    }

    if (d < diameter){
      let vxTemp = this.velX;
      let vyTemp = this.velY;
      this.velX = other.velX;
      this.velY = other.velY;
      other.velX = vxTemp;
      other.velY = vyTemp;

      const overlap = diameter - d;
      const nx = dx / (d || 0.001);
      const ny = dy / (d || 0.001);
      this.x   += nx * (overlap * 0.5);
      this.y   += ny * (overlap * 0.5);
      other.x  -= nx * (overlap * 0.5);
      other.y  -= ny * (overlap * 0.5);

      bumpSound();
      ripples.push(
        new Ripple(
          (this.x + other.x)/2,
          (this.y + other.y)/2
        )
      );
    }
    

  }
}

  

    
  
}

class Ripple{
    constructor(x,y){
      this.x = x
      this.y = y
      this.size = 0
      this.a = 0.7
      }
  
    show(){
      noFill()
      strokeWeight(1)
      stroke(0,0,100,this.a)
      ellipse(this.x,this.y,this.size)
      this.size +=15
      this.a -=0.08
      }
}

function bumpSound(){
  let n = floor(random(0,9))
  notes[n].play();


}

function avgPos(){
    let avgs = []
    let xs = 0
    let ys = 0
    
    if (spheres.length>0){
    for (let i = 0;i<spheres.length;i++){
        xs+=spheres[i].x
        ys+=spheres[i].y
        }
    avgs.push(xs/spheres.length)
    avgs.push(ys/spheres.length)
    }
  
    else{
    avgs.push(width/2)
    avgs.push(height/2)
      
    }
    return avgs
  }

function cull(){
  for (let i = 0;i<spheres.length;i++)
      if (  spheres[i].x<-radius
        ||spheres[i].x>width+radius
        ||spheres[i].y<-radius
        ||spheres[i].y>height+radius
        ||frameRate()<15)
    
       {spheres.splice(i,1)}
  
}

let spheres = []
let initialVel = 1
let diameter = 50
let radius = diameter/2
let grav = 0.0009
let smoothAvgX = 0
let smoothAvgY = 0
let avgSmoothing = 0.1
let scale1 = [207.65, 233.08, 261.63, 277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25, 554.37]

let notes = []
let ripples =[]
let txt = "click anywhere (sound on)"
             

function preload(){
  notes[0] =loadSound("notes-001.wav")
  notes[1] =loadSound("notes-002.wav")
  notes[2] =loadSound("notes-003.wav")
  notes[3] =loadSound("notes-004.wav")
  notes[4] =loadSound("notes-005.wav")
  notes[5] =loadSound("notes-006.wav")
  notes[6] =loadSound("notes-007.wav")
  notes[7] =loadSound("notes-008.wav")
  notes[8] =loadSound("notes-009.wav")
  font = loadFont("../hypermarket-light.ttf")

}






function mouseClicked(){
  spheres.push(new Sphere(mouseX, mouseY));
txt = ''  
}

function setup() {
  createCanvas(windowWidth+5, windowHeight+5);
  colorMode(HSB)
  smoothAvgX = width/2
  smoothAvgY = height/2
  smoothCenterX = 0
  smoothCenterY = 0
  


}

function draw(){
  
  background(0,0,0,0.3);  
  noStroke()
  fill(0,0,100)
  textFont(font)
  textSize(width/40)
  text(txt, width/2 - width/10,height/2)
  fill(190,90,30,1)

  
  for (let i = 0;i<spheres.length;i++){
    spheres[i].show()
    spheres[i].attractCollide()
    spheres[i].update()
  
    }
  
  for (let i = 0;i<ripples.length;i++){ripples[i].show()}
 
  
  smoothAvgX = lerp(smoothAvgX,avgPos()[0],0.1)
  smoothAvgY = lerp(smoothAvgY,avgPos()[1],0.1)
  
  
//   fill(0,100,100)
//   ellipse(smoothAvgX,smoothAvgY,30)
  
  cull()

}