

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
    this.IsWhite = false
    this.movedArray = []
    
    
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
    
    
    noStroke()
    for (let i = 0;i<this.particleArray.length;i++)

    
        {
          fill(0,0,dotB)

          
          ellipse(this.particleArray[i].pos.x,
                 this.particleArray[i].pos.y,
                 this.particleArray[i].size,
              // this.particleArray[i].size*3
             )}  
  }   
  

  
  update(){
        let allVels = 0

        // print(this.particleArray.length)
        
        if (this.isField == false){
          for (let i = 0;i<this.particleArray.length;i++) 
              {this.particleArray[i].update(i)
              allVels +=  this.particleArray[i].vel.mag()
              }
        }
        
        else if (this.isField == true 
            //  && this.isMoving == true
            )
        
        {

          let hadItsTurn = []
          for (let i = 0;i<this.particleArray.length;i++) 
            {this.particleArray[i].updateInField(i)
            
              allVels +=  this.particleArray[i].vel.mag()
              dragCounter+= 1

              if (this.IsWhite == true){
                  stroke(dotH,dotS,dotB,0.14)
                  strokeWeight(0.5)
                  
                  
                  hadItsTurn.push(this.particleArray[i])

                  for (let j = 0;j<this.particleArray.length;j++){
                    if (this.particleArray[i]!=this.particleArray[j]
                      
                      && hadItsTurn.includes(this.particleArray[j])==false
                      && p5.Vector.dist(this.particleArray[i].pos,this.particleArray[j].pos)<40
                      && p5.Vector.dist(this.particleArray[i].pos,this.particleArray[j].pos)>20
                      
                      ){
          
                      line(this.particleArray[i].pos.x,
                           this.particleArray[i].pos.y,
                           this.particleArray[j].pos.x,
                           this.particleArray[j].pos.y)
                     } 
                  }
               }
            }

            
            bg = lerp(bg,newbg,bgChangeSpeed)
            dotB = lerp(dotB,newdotB,bgChangeSpeed)

            if (bg>dotB-crossoverWindow && bg<dotB+crossoverWindow)
                {
                this.reduce()
                this.IsWhite = true
                }
          
            
        }
        
        this.avgVel = allVels/this.particleArray.length
    
        
      
        if (this.avgVel>changeThreshold && mouseIsPressed && this.allowChange == true){this.changeTargetArray()}
        if (this.avgVel<settleSensitivity){this.allowChange = true}
        if (this.avgVel<0.001){this.isMoving==false}

        }

        reduce(){
          
          
          for (let i = 0; i < this.particleArray.length ;i++) {
            if (this.movedArray.includes(this.particleArray[i]) == false)
                 {this.particleArray.splice(i,1)
                  i-=1
                }
             }
            

          
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
            
              for (let i = 0; i < this.particleArray.length; i++)
              {
                if (p5.Vector.dist(this.particleArray[i].pos,createVector(mouseX,mouseY)) <  mouseSize/pointReduction){
                  this.movedArray.push(this.particleArray[i])}
              }

            noiseDetail(6, fallOff)
            // this.multiply()
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

  multiply(){
    for (let i = 0; i < multiples; i++){

    let randPoint = this.particleArray[floor(random(0,this.particleArray.length-1))]

    let newPoint = new Particle(randPoint.pos.x,randPoint.pos.y)
      newPoint.vel.x = randomGaussian(randPoint.vel.x,1)
      newPoint.vel.y = randomGaussian(randPoint.vel.y,1) 

    this.particleArray.push(newPoint)

    }
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
  



  

  updateInField(i){
   

    this.vel.add(((-(this.pos.y-(windowHeight/2)) * (frameCount * rotSpeed))* rotForce),(((this.pos.x-(windowWidth/2)) * (frameCount * rotSpeed))* rotForce))


    // this.vel.add((noise(frameCount*driftSpeed +(i*0.2 + 200))-0.5)*0.0003,
    //              (noise(frameCount*driftSpeed + (i*0.2))-0.5)*0.0003)
    
    

    // if (dist(this.pos.x,this.pos.y,windowWidth/2,windowHeight/2)>width/5){
    //     this.vel.x -= (this.pos.x-windowWidth/2) * centerYank
    //     this.vel.y -= (this.pos.y-windowHeight/2) * centerYank
    // }


    // if (this.vel.mag<0.0001){


        this.vel.x -= (this.pos.x-windowWidth/2) * centerPull
        this.vel.y -= (this.pos.y-windowHeight/2) * centerPull

        


        // this.vel.x +=(noise(this.pos.x*fieldSize,this.pos.y*fieldSize,(frameCount*fieldZSpeed)      )-0.5)* map(dragCounter,100000,freezeTime,0.5,0,true)
        // this.vel.y +=(noise(this.pos.x*fieldSize,this.pos.y*fieldSize,(frameCount*fieldZSpeed) + 200)-0.5)* map(dragCounter,100000,freezeTime,0.5,0,true)

        
    // }

    this.vel.mult(map(dragCounter,100000,freezeTime,initFieldDrag,0,true))

    this.vel.add((noise(frameCount*driftSpeed +(i*driftRand+200))-0.5)*driftDist*3,
                 (noise(frameCount*driftSpeed +(i*driftRand    ))-0.5)*driftDist*3)

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
      this.image = loadImage(thumbnail)
      // this.thumbnail = createA(link,link)
      this.name = name
      this.size = 70
      this.link = link
      this.pos = createVector(0,0)
      this.smoothing = 0.01
      this.newPos = createVector(0,0)
      this.targetPoint = false
      this.targetPoint2 = false
      this.targetPoint3 = false
      this.targetVect = createVector(0,0)
  
      
      }

      assign(){
        this.targetPoint = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint2 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint3 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint4 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint5 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint6 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]
        this.targetPoint7 = swarm1.particleArray[floor(random(0,swarm1.particleArray.length))]

        this.targetVect = this.targetPoint.pos
      }

      show(){
        
        

  

        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint2.pos.x,
          this.targetPoint2.pos.y,
        )

        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint3.pos.x,
          this.targetPoint3.pos.y,
        )


        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint4.pos.x,
          this.targetPoint4.pos.y,
        )

        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint5.pos.x,
          this.targetPoint5.pos.y,
        )
        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint6.pos.x,
          this.targetPoint6.pos.y,
        )
        line(
          this.pos.x + this.size/2,
          this.pos.y +  this.size/2,
          this.targetPoint7.pos.x,
          this.targetPoint7.pos.y,
        )
        // this.thumbnail.position(this.pos.x,this.pos.y)

        // rect(
        //   this.pos.x,
        //   this.pos.y,
        //   this.size
          
        // )

        image(this.image,
                   this.pos.x,
                   this.pos.y,
                   this.size,
                   this.size
                   )

        fill(0,0,100)

        textSize(10)
        text([floor(this.targetPoint.pos.x),floor(this.targetPoint.pos.y)],this.pos.x,this.pos.y+this.size)
      
      }

      update(){

        // if (this.pos.x>windowWidth/1.5){let x = windowWidth}

        // else if (this.pos.x<windowWidth/0.5){let x = 0}

        // if (this.pos.y>windowHeight/1.5){let y = windowHeight}

        // else if(this.pos.y<windowHeight/0.5){let y = 0}

        // let edge = createVector(x,y)

        

        if(abs(this.targetVect.x-(width/2))>abs(this.targetVect.y-(height/2))){

            this.newPos.y = this.targetVect.y
            if (this.targetVect.x<width/2)
              {this.newPos.x = lerp(this.targetVect.x,0,boxDist)}
            else{
                this.newPos.x = lerp(this.targetVect.x,width,boxDist)}
        }

        else{
            this.newPos.x = this.targetVect.x
            if (this.targetVect.y<height/2)
              {this.newPos.y = lerp(this.targetVect.y,0,boxDist)}
            else{
                this.newPos.y = lerp(this.targetVect.y,height,boxDist)}
            }


        for (let i = 0 ; i < sketches.length;i++){
          if (p5.Vector.dist(this.newPos,sketches[i].pos)<this.size && this!=sketches[i])
          {
            this.targetVect.add(p5.Vector.sub(this.newPos,sketches[i].pos))
          }
      }

        // this.newPos.set(-((windowWidth/2-this.targetPoint.pos.x)*2)+windowWidth/2,
        //                -((windowHeight/2-this.targetPoint.pos.y)*2)+windowHeight/2)
                        
        this.pos = (p5.Vector.lerp(this.pos,this.newPos,this.smoothing))

        }
}



function showTxtPnts(txtpnts){
  for (let i = 0; i<txtpnts.length;i++)
  {ellipse(txtpnts[i].x,txtpnts[i].y, 8)}
  
}


function mouseClicked(){
  if(dragCounter>100000){
    for (let i = 0;i < sketches.length;i++){
      if (mouseX<sketches[i].pos.x+sketches[i].size
       && mouseX>sketches[i].pos.x
       && mouseY<sketches[i].pos.y+sketches[i].size
       && mouseY>sketches[i].pos.y
        ){window.open(sketches[i].link)}
  
    }


  }}

  


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
let mouseSize = 150
let repelStrength = 0.05
let pointSize = 0.015
let settleSensitivity = 0.8
let changeThreshold = 10
let drag = 0.9
let initFieldDrag = 0.97
let freezeTime = 400000
let fieldSize = 0.004
let fieldStrength = 1
let fieldZSpeed = 0.01
let fallOff = 0.5
let centerPull = 0.00025
let centerYank = 0.0002
let rotSpeed = 0.005
let rotForce = 0.00004
let dragCounter = 0
let multiples = 2000
let crossoverWindow = 1
let boxDist = 0.3

let bg = 10
let newbg = 100

let dotB = 86
let newdotB = 10

let dotH = 0
let dotS = 0

let bgChangeSpeed = 0.05
let pointReduction = 1.3
let smallMouse = 1
let bigMouse = 45
let mouseDotSize = 0
let mouseChangeSpeed = 0.15
let zoom = 1

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

  noCursor()
  
  // resizeCanvas(windowWidth+5, windowHeight+5)
  background(200,0,bg);
  // text(dragCounter,50,50)
//   fill(0,0,255,50)
//   showTxtPnts(txtPoints1)
//   swarm1.visualize()




for (let i = 0; i < swarm1.particleArray.length; i++){
  if (p5.Vector.dist(swarm1.particleArray[i].pos,createVector(mouseX,mouseY)) <  mouseSize/2 && swarm1.isField==false)
      
     {
     swarm1.particleArray[i].vel.x += (swarm1.particleArray[i].pos.x-mouseX) * repelStrength/8
     swarm1.particleArray[i].vel.y += (swarm1.particleArray[i].pos.y-mouseY) * repelStrength/8
     } 
}




if (mouseIsPressed== true){

  mouseDotSize = lerp(mouseDotSize,bigMouse,mouseChangeSpeed)

  for (let i = 0; i < swarm1.particleArray.length; i++){
    if (p5.Vector.dist(swarm1.particleArray[i].pos,createVector(mouseX,mouseY)) <  mouseSize && swarm1.isField==false)
        
       {
       swarm1.particleArray[i].vel.x += (swarm1.particleArray[i].pos.x-mouseX) * repelStrength
       swarm1.particleArray[i].vel.y += (swarm1.particleArray[i].pos.y-mouseY) * repelStrength
       } 
  }
}

else{mouseDotSize = lerp(mouseDotSize,smallMouse,mouseChangeSpeed)}


  swarm1.update()  

  if (swarm1.IsWhite == false)
  {
    swarm1.show()
  }

 




  if (dragCounter>100000){
  for (let i = 0; i<sketches.length;i++){
    if (sketches[i].targetPoint==false){sketches[i].assign()}
  
    sketches[i].update()
    
    sketches[i].show()




  }}

  if (swarm1.IsWhite == true){
    noFill()
    stroke(0,0,0)
    strokeWeight(2)
    ellipse(mouseX,mouseY,10)

    if(mouseIsPressed){
      fill(0)
      ellipse(mouseX,mouseY,10)
    }
  
  
    // scale(zoom)
  
    // translate(-windowWidth/4,-windowHeight/4)
  
    // zoom  = lerp(zoom,2,0.01)
    
    
  }
  else{
    
    noFill()
  stroke(200,100,100)
  
  strokeWeight(map(mouseDotSize,smallMouse,bigMouse,8,-5))
  
  ellipse(mouseX,mouseY,mouseDotSize)
  }
  

}