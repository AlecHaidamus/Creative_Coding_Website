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
      for (let i = 0;i<spheres.length;i++){
      if (spheres[i]!=this){
          
          if (dist(spheres[i].x,spheres[i].y,this.x,this.y)<=diameter)
            {let temp;
              
                  temp = spheres[i].velX
                         spheres[i].velX = this.velX
                         this.velX = temp
              
                  temp = spheres[i].velY
                         spheres[i].velY = this.velY
                         this.velY = temp
                         bumpSound()
             ripples.push(new Ripple((spheres[i].x+this.x)/2,
                                     (spheres[i].y+this.y)/2
                                    ))
            
            }
      
          let xDist = this.x-spheres[i].x
          let yDist = this.y-spheres[i].y

          if (dist(spheres[i].x,spheres[i].y,this.x,this.y)>=diameter){
          
          this.velX -= xDist * grav
          this.velY -= yDist * grav
          }
        
        if (dist(spheres[i].x,spheres[i].y,this.x,this.y)<diameter*1.2){
          
          this.velX += xDist * grav
          this.velY += yDist * grav
          }
        
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
let grav = 0.0006
let smoothAvgX = 0
let smoothAvgY = 0
let avgSmoothing = 0.1
let scale1 = [207.65, 233.08, 261.63, 277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25, 554.37]

let notes = []
let ripples =[]
             

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

}






function mouseClicked(){
  spheres.push(new Sphere(mouseX, mouseY));
  // print(avgPos())
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  smoothAvgX = width/2
  smoothAvgY = height/2
  smoothCenterX = 0
  smoothCenterY = 0
  


}

function draw(){
  
  background(0,0,0,0.3);  
  noStroke()
  fill(190,90,30,1)
  // print(notes)
  
  // translate(smoothAvgX-width/2,smoothAvgY-height/2)
  
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