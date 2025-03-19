

class Swarm{
  constructor(x,y,stringPointsArray){
    this.x = x
    this.y = y
    this.particleArray = []
    this.stringPointsArray = stringPointsArray
    this.avgVel = 0 
    this.swarmTargetID = 0
    this.allowChange = true
    this.isField = false
    this.isMoving = true
    
    
    for (let i = 0;i<pointsAmt;i++){
    this.particleArray.push(new Particle(randomGaussian(this.x,posRand),
                                         randomGaussian(this.y,posRand),
                                         stringPointsArray[0][constrain(
                                                                       floor(i * stringPointsArray[0].length/pointsAmt),
                                                                       0,
                                                                       stringPointsArray[0].length-1)]
                                        ))
    }  
  }


  show(){
    
    fill(255)
    noStroke()
    for (let i = 0;i<this.particleArray.length;i++)
        {ellipse(this.particleArray[i].pos.x,
              this.particleArray[i].pos.y,
              this.particleArray[i].size,
              // this.particleArray[i].size*3
             )}  
  }   
  
  
  update(){
        let allVels = 0

        
        
        if (this.isField == false){
          for (let i = 0;i<this.particleArray.length;i++) 
              {this.particleArray[i].update(i)
              allVels +=  this.particleArray[i].vel.mag()
              }
        }
        
        else if (this.isField == true && this.isMoving==true){
          for (let i = 0;i<this.particleArray.length;i++) 
            {this.particleArray[i].updateInField(i)
              allVels +=  this.particleArray[i].vel.mag()
              dragCounter+= 1
             
            }
        }
        
        this.avgVel = allVels/this.particleArray.length
    
        
      
        if (this.avgVel>5 && mouseIsPressed && this.allowChange == true){this.changeTargetArray()}
        if (this.avgVel<changeSensitivity){this.allowChange = true}
        if (this.avgVel<0.001){this.isMoving==false}

        }
        
        
          
//    allow(){
//      print('ok')
//     this.allowChange = true
//      print(this.allowChange)
//   }
  
//   disAllow(){
//     print('not ok')
//     this.allowChange = false
//      print(this.allowChange)
//   }
  
  
  changeTargetArray(){
    
        this.swarmTargetID += 1
        if (this.swarmTargetID>this.stringPointsArray.length-1){this.swarmTargetID = 0 }
        if(this.swarmTargetID>this.stringPointsArray.length-2)   
            {this.isField = true
            noiseDetail(6, fallOff)
            }
          
    
        for (let i = 0;i<this.particleArray.length;i++)
            {
            this.particleArray[i].target = 
              
            this.stringPointsArray[this.swarmTargetID]
                                  [constrain(floor(i *this.stringPointsArray[this.swarmTargetID].length/pointsAmt),
                                  0,
                                  this.stringPointsArray[this.swarmTargetID].length-1)] 
            }  
    
      // print('changed to',this.swarmTargetID)
      this.allowChange = false
    
      // this.disAllow()
      // setTimeout(this.allow,2000)
  }

  visualize(){
    
    stroke(0,0,0,75)
    strokeWeight(0.7)
    
    for (let i = 0;i<this.particleArray.length;i++){
      this.particleArray[i].visualize()
      
      fill(255,0,0)

      ellipse(this.particleArray[i].target.x,this.particleArray[i].target.y,5)
 
    }
  }
  
  
  }




class Particle{
  constructor(x,y,target){
    this.pos = createVector(x,y)
    this.vel = createVector(randomGaussian(0,initVel),randomGaussian(0,initVel))
    this.smoothVel = createVector(1,1)
    this.target = target
    // this.drag = random(minDrag,maxDrag)
    this.kFac = randomGaussian(1,0.13)
    this.size = randomGaussian(fontSize*pointSize,0)
    
  }
  
  
  update(i){
  
    let attract = createVector((this.pos.x - this.target.x) * (k*this.kFac),
                               (this.pos.y - this.target.y) * (k*this.kFac))
    
    
    this.vel = this.vel.sub(attract)
    this.vel.mult(drag)
    this.vel.add((noise(frameCount*driftSpeed +(i*driftRand + 200))-0.5)*driftDist,
                 (noise(frameCount*driftSpeed + (i*driftRand))-0.5)*driftDist)
    

    

 

    this.smoothVel = p5.Vector.lerp(this.smoothVel,this.vel,accelSpeed)
    this.pos.add(this.smoothVel)
    
  }
  



  updateAfterSettled(){


  }

  updateInField(i){
   
    // this.vel.x -= ((this.vel.x*(cos(frameCount * rotSpeed) - 1))- this.vel.y*(sin(frameCount * rotSpeed))) * rotForce
    // this.vel.y -= (this.vel.x*sin(frameCount * rotSpeed)+this.vel.y*(cos(frameCount * rotSpeed)-1)) * rotForce
  
    this.vel.add(((-(this.pos.y-(windowHeight/2)) * (frameCount * rotSpeed))* rotForce),(((this.pos.x-(windowWidth/2)) * (frameCount * rotSpeed))* rotForce))


    this.vel.add((noise(frameCount*driftSpeed +(i*0.2 + 200))-0.5)*0.0003,
                 (noise(frameCount*driftSpeed + (i*0.2))-0.5)*0.0003)
    
    // this.vel.x += this.x*(cos(frameCount*rotSpeed)-1) 
    //                  - this.y*(sin(frameCount*rotSpeed))
    //                  + (windowWidth/2)*(1-cos(frameCount*rotSpeed)
    //                  + (windowHeight/2)*sin(frameCount*rotSpeed))
    
    // this.vel.y += this.x*(sin(frameCount*rotSpeed))
    //                  + this.y*(cos(frameCount*rotSpeed)-1)
    //                  - (windowWidth/2)*sin(frameCount*rotSpeed)
    //                  + (windowHeight/2)*(1-cos(frameCount*rotSpeed))


    // this.pos.x = ((this.pos.x - windowWidth/2)*cos(frameCount * rotSpeed)) - ((this.pos.y - windowHeight/2)*sin(frameCount * rotSpeed)) + windowWidth/2
    // this.pos.y = ((this.pos.x - windowWidth/2)*sin(frameCount * rotSpeed)) + ((this.pos.y - windowHeight/2)*cos(frameCount * rotSpeed)) + windowHeight/2

    

    if (dist(this.pos.x,this.pos.y,windowWidth/2,windowHeight/2)>width/5){
        this.vel.x -= (this.pos.x-windowWidth/2) * centerYank
        this.vel.y -= (this.pos.y-windowHeight/2) * centerYank
    }

    this.vel.x -= (this.pos.x-windowWidth/2) * centerPull
    this.vel.y -= (this.pos.y-windowHeight/2) * centerPull

    

    // text((fieldDrag*map(dragCounter,0,1000000,1,0,true)),50,200)

    this.vel.x +=(noise(this.pos.x*fieldSize,this.pos.y*fieldSize,(frameCount*fieldZSpeed)      )-0.5)* fieldStrength
    this.vel.y +=(noise(this.pos.x*fieldSize,this.pos.y*fieldSize,(frameCount*fieldZSpeed) + 200)-0.5)* fieldStrength

    this.vel.mult(map(dragCounter,100000,2000000,0.955,0,true))

    this.smoothVel = p5.Vector.lerp(this.smoothVel,this.vel,accelSpeed)
    this.pos.add(this.smoothVel)
    
  }





  visualize(){
    line(this.pos.x,this.pos.y,
         this.target.x,this.target.y)
    
  }


}


class SketchBox{
      constructor(name,thumbnail,link){
      this.image = thumbnail
      this.thumbnail = createA(link,link)
      this.name = name
      this.size = 70
      this.pos = createVector(0,0)
      this.smoothing = 0.01
      this.newPos = createVector(0,0)
      this.targetPoint = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
      }

      show(){
        
        stroke(0,100,100)
        strokeWeight(1)

        
        noFill()
        

        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint.pos.x,
          this.targetPoint.pos.y,
        )
        this.thumbnail.position(this.pos.x,this.pos.y)
        rect(
          this.pos.x,
          this.pos.y,
          this.size
          
        )
        fill(0,0,100)

        // textSize(2)
        // text((this.targetPoint.pos.x,this.targetPoint.pos.y),this.pos.x,this.pos.y+this.size-6)
      
      }

      update(){

        this.newPos.set(-((windowWidth/2-this.targetPoint.pos.x)*2)+windowWidth/2,
                        -((windowHeight/2-this.targetPoint.pos.y)*2)+windowHeight/2)
        this.pos = (p5.Vector.lerp(this.pos,this.newPos,this.smoothing))

        }
}



function showTxtPnts(txtpnts){
  for (let i = 0; i<txtpnts.length;i++)
  {ellipse(txtpnts[i].x,txtpnts[i].y, 8)}
  
}



function mouseDragged(){
  for (let i = 0; i < swarm1.particleArray.length; i++){

      
      if (p5.Vector.dist(swarm1.particleArray[i].pos,createVector(mouseX,mouseY)) <  mouseSize && swarm1.isField==false)
          
         {
         swarm1.particleArray[i].vel.x += (swarm1.particleArray[i].pos.x-mouseX) * repelStrength
         swarm1.particleArray[i].vel.y += (swarm1.particleArray[i].pos.y-mouseY) * repelStrength
         } 
    }
  
}

let txtPoints1;
let initVel = 1
let pointsAmt = 2000
let posRand = 0
// let minDrag = 0.97
// let maxDrag = 0.97
let k = 0.005
let accelSpeed = 0.4
let fontSize = 200
let driftSpeed = 0.008
let driftDist = 0.06
let driftRand = 0.1
let mouseSize = 100
let repelStrength = 0.07
let pointSize = 0.01
let changeSensitivity = 3
let drag = 0.9
let fieldSize = 0.005
let fieldStrength = 0.5
let fieldZSpeed = 0.01
let fallOff = 0.5
let centerPull = 0.0001
let centerYank = 0.000
let rotSpeed = 0.007
let rotForce = 0.00006
let dragCounter = 0



let pointStrings = []
let sketches = []

let swarm1;
function preload(){
  // hmThin = loadFont('hypermarket-light.ttf')
  // dvThin = loadFont('TRJNDaVinci-Thin-Trial.ttf')
  // hypermarket = loadFont('hypermarket-regular.ttf')
  handwritten = loadFont('BurtonScratch-Regular.ttf')
  // dotMatrixFont = loadFont('Dotmatrx.ttf')
  // pencil = loadFont('ThinPencilHandwriting.otf')
}

function setup() {

  colorMode(HSB)
  angleMode(DEGREES)
  createCanvas(windowWidth+5, windowHeight+5);
  
  let textLoc = createVector(windowWidth/2-200,windowHeight/2)
  
  txtPoints1 = handwritten.textToPoints("Welcome", 
                                        textLoc.x,textLoc.y,fontSize,
                                       {sampleFactor:0.4,simplifyThreshold: 0}
                                       )

  txtPoints2 = handwritten.textToPoints("to my \n\n\n\n\n\n\n\n\n\n  garden", 
                                        textLoc.x,textLoc.y,fontSize,
                                        {sampleFactor:0.4,simplifyThreshold: 0}
                                        )

  txtPoints3 = handwritten.textToPoints("have a look \n\n\n\n\n\n\n\n around", 
                                        textLoc.x,textLoc.y,fontSize,
                                        {sampleFactor:0.4,simplifyThreshold: 0}
                                        )

  away = [[0,0]]
  
  pointStrings.push(txtPoints1)
  pointStrings.push(txtPoints2)
  pointStrings.push(txtPoints3)
  pointStrings.push(away)
  
  swarm1 = new Swarm(windowWidth/2,windowHeight/2,pointStrings)
  
  
  
  blobSketch = new SketchBox('0.1','guy.png','SoftBodyFaceSketch/SoftBody.html')
  radialSketch = new SketchBox('0.02','radial.png',' RadialFieldSketch/radial.html')
  creatureSketch = new SketchBox('0.03','creature.png','CreatureSketch/creature.html')
  structureSketch = new SketchBox('0.04','structure.png','PointsStructuresSketch/PointsStructures.html')
  nbodySketch = new SketchBox('0.04','NBody.png','NBodySketch/Nbody.html')

  sketches.push(blobSketch)
  sketches.push(radialSketch)
  sketches.push(creatureSketch)
  sketches.push(structureSketch)
  sketches.push(nbodySketch)
  // hull = concaveHull.calculate([20,20],k)
}

function draw() {


  background(0);
  // text(dragCounter,50,50)
//   fill(0,0,255,50)
//   showTxtPnts(txtPoints1)
//   swarm1.visualize()
  
  swarm1.update()  
  swarm1.show()

  if (dragCounter>300000){
  for (let i = 0; i<sketches.length;i++){
    sketches[i].update()
    sketches[i].show()
  }}
    

}