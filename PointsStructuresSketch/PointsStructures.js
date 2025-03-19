class Point{
    constructor(x,y){
      this.x = x
      this.y = y
      this.velX = randomGaussian(0,intialVel)
      this.velY = randomGaussian(0,intialVel)
      this.distX = this.x-avgXpos
      this.distY = this.y-avgYpos
      }
  
    show(){
      strokeWeight(1)
      stroke(0,0,100)
      fill(0,0,0)
      ellipse(this.x,this.y,3)
      }
  
    update(){
      this.distX = this.x-avgXpos
      this.distY = this.y-avgYpos
      
      this.velX -= this.distX *centerPull
      this.velY -= this.distY *centerPull
      
      this.velX = lerp(this.velX,avgXvel,driftAway)
      this.velY = lerp(this.velY,avgYvel,driftAway)
            
      this.x += this.velX
      this.y += this.velY
      }
}



let points = []
let avgXvel = 0
let avgYvel = 0
let avgXpos = 0
let avgYpos = 0
let allXpos = 0
let allYpos = 0
let invert = 1

let centerPull = 0.0002
let intialVel = 0.5
let avgPosSmoothing = 0.07
let driftAway = 0.00007
let lineDist = 50
let lineDistMin = 0

function mouseDragged(){
  points.push(new Point(mouseX, mouseY));
  // print(points)
}

function changeMode(){
  if (invert == 0)
      {invert = 1}
  
  else {invert = 0}
  
  print(invert)
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  darkMode = createButton('Dark/Light')
  darkMode.mousePressed(changeMode)

}

function draw() {
  colorMode(HSB)
  background(0,0,0);
  frameRate(100)
  
  allXpos = 0
  allYpos = 0
  avgXvel = 0
  avgYvel = 0


  for (let i = 0; i<points.length;i++){
    avgXvel += points[i].velX
    avgYvel += points[i].velY
    allXpos += points[i].x
    allYpos += points[i].y
    }
  
  avgXvel = avgXvel/points.length
  avgYvel = avgYvel/points.length
  
  if (points.length==0){
  avgXpos = windowWidth/2
  avgYpos = windowHeight/2
  }
  
else{
  avgXpos = lerp(avgXpos,allXpos/points.length,avgPosSmoothing)
  avgYpos = lerp(avgYpos,allYpos/points.length,avgPosSmoothing)
}
  
  noFill()
  
    // beginShape()
  for (let i = 0; i<points.length;i++){

    strokeWeight(0.3)
    stroke(0,0,100,0.3)
    for (let j = 0; j<points.length;j++){
      
      if (dist(points[i].x,points[i].y,points[j].x,points[j].y)<lineDist&&
          dist(points[i].x,points[i].y,points[j].x,points[j].y)>lineDistMin)
        
        {line(points[i].x,points[i].y,points[j].x,points[j].y)}
    }
    
    if (invert == 0)
      {points[i].show()}
    
    points[i].update()
    
    vertex(points[i].x,points[i].y)

    avgXvel += points[i].velX
    avgYvel += points[i].velY
    
      

    // line(points[i].x,points[i].y,avgXpos,avgYpos)
    
    
    
    
    if (  points[i].x<-10
        ||points[i].x>width+10
        ||points[i].y<-10
        ||points[i].y>height+10
        ||frameRate()<15)
    
       {points.splice(i,1)}
  }
  
  // endShape()
  
  
//   fill(0,100,100,2)
// ellipse(avgXpos,avgYpos,5)
//   fill(0,0,0,2)
// text(' avg',avgXpos,avgYpos)
  
    if (invert == 1){filter(INVERT)}

 
}