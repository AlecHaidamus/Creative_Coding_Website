class Guy{
    constructor(x,y){
      this.numVertices = numVertices
      this.pos = createVector(x,y)
      this.vertexArray = []
      this.springArray = []
      this.radius = radius
      this.center = createVector(x,y)
      this.numSprings = 0
      this.isSpeaking = false
      this.speech = ''
      this.vowel = false
      this.awake = true

    for(let i = 0; i < this.numVertices; i++){
      
      
      
    this.vertexArray.push(new Vert(
    randomGaussian(cos(i*(2*PI/this.numVertices))*this.radius+this.pos.x,vertexRand/numVertices),
    randomGaussian(sin(i*(2*PI/this.numVertices))*this.radius+this.pos.y,vertexRand/numVertices)
                                  ))}
      
      
    let hadItsTurn = []
    
    for(let i = 0; i < this.vertexArray.length; i++){
    hadItsTurn.push(this.vertexArray[i])
      
     for(let j = 0; j < this.vertexArray.length; j++){
       if(this.vertexArray[j]!=this.vertexArray[i] && hadItsTurn.includes(this.vertexArray[j])==false){
           this.numSprings +=1
          this.springArray.push(new Spring(this.vertexArray[i],
                                           this.vertexArray[j],
                                           k
                                           *(dist(this.vertexArray[i].pos.x,
                                                  this.vertexArray[i].pos.y,
                                                  this.vertexArray[j].pos.x,
                                                  this.vertexArray[j].pos.y
                                                   )*kDistFactor
                                             ),
                                           
                                           restLength
                                           *(dist(this.vertexArray[i].pos.x,
                                                  this.vertexArray[i].pos.y,
                                                  this.vertexArray[j].pos.x,
                                                  this.vertexArray[j].pos.y
                                                   )*restLengthDistFactor
                                              )
                                          )
                               )
      }
     }
    }
      // print(this.springArray)
    }
  
  update(){
    
    for (let i = 0;i<this.springArray.length;i++){
      
        this.springArray[i].updateSpringnVerts()
      // print(this.springArray[i])
        }
    let allPos = createVector(0,0)
    for (let i = 0;i<this.vertexArray.length;i++) {allPos.add(this.vertexArray[i].pos)}
    
    this.center = p5.Vector.div(allPos,this.vertexArray.length)
    // ellipse(this.center.x,this.center.y,10)
    // print(this.center)



    if (this.isSpeaking == true&&this.awake==true){
      

        if (this.vowel == true){
            this.vowel = false
            this.speech += vowels[floor(random(0,vowels.length))]
            }

        else{this.vowel = true
            this.speech += consonants[floor(random(0,consonants.length))]
            }
        if (floor(random(0,4)) == 1)
            {this.speech += ' '}

        if (floor(random(0,10)) == 1)
            {this.speech += '\n'}
            

        
        
          
        }
        fill(0)
      textSize(20)
        text(this.speech,this.center.x+this.radius,this.center.y)
  }
  
  
   
  show(){
    noStroke()
    fill(345,83,75)
    beginShape()
    curveVertex(this.vertexArray[this.vertexArray.length-1].pos.x,
                this.vertexArray[this.vertexArray.length-1].pos.y )
    
    for (let i = 0; i < this.numVertices; i++){
         curveVertex(this.vertexArray[i].pos.x,this.vertexArray[i].pos.y)}
    
    curveVertex(this.vertexArray[0].pos.x,
                this.vertexArray[0].pos.y )
    curveVertex(this.vertexArray[1].pos.x,
                this.vertexArray[1].pos.y)
    endShape()
    }

    sleep(){
      guy1.awake = false
      guy1.speech = ' '
  
    }

    changeMouth(){
      mouthCounter += 1
      if (mouthCounter > mouths.length-1){mouthCounter = 0}
      
    }

    blink(){
      if (floor(random(0,4)) == 1){
    
        leftEye = leftEyeClosed
        rightEye = rightEyeClosed
    
        setTimeout(openUp,100)
      }
    
      function openUp(){
        rightEye = rightEyeOpen
        leftEye = leftEyeOpen
      }
    
    }

    speak(){
      if (floor(random(0,4)) == 1 && guy1.awake==true){

        guy1.isSpeaking = true
      

        // print(this.isSpeaking)
        guy1.speech = ''

        setTimeout(guy1.shutUp,random(500,3000))
      }
    
    }

    shutUp(){
      guy1.isSpeaking = false
    }
  
}
      

class Spring{
    constructor(vertA,vertB,k,restLength){
      this.restLength = restLength
      this.k =  k
      this.anchor = vertA
      this.weight = vertB
      }
  
    updateSpringnVerts(){
      let springForce = p5.Vector.sub(this.anchor.pos, this.weight.pos)
      let displacement = springForce.mag() - this.restLength
      
      
      // if (displacement<50 && displacement>-20){displacement = lerp(displacement,0,0.5)}
      
      springForce.normalize()
      springForce.mult(this.k * displacement)
      
      
      this.weight.updateVert(springForce)
        springForce.mult(-1)
      this.anchor.updateVert(springForce)
      }
  
    show(){
      strokeWeight(1)
      stroke(0,0,70)
      line(this.anchor.pos.x,this.anchor.pos.y,this.weight.pos.x,this.weight.pos.y)
      }

}


class Vert{
    constructor(x,y){
      this.pos = createVector(x,y)
      // this.vel = createVector(0,0)
      this.vel = createVector(randomGaussian(0,initVertSpeed),
                              randomGaussian(0,initVertSpeed))

      
      }
    
    updateVert(springForce){
      
      this.vel.add(springForce)
      this.vel.y += gravity
      this.vel.mult(drag)
      
      this.pos.add(this.vel)
      }
  
    show(vertNum){
      noStroke()
      fill(0)
      ellipse(this.pos.x,this.pos.y,10)
      text(vertNum,this.pos.x+10,this.pos.y)
      }
  
      
}

let restLength = 200
let k = 0.001
let kDistFactor = 0.003
let restLengthDistFactor = 0.005
let initVertSpeed = 0.3
let guy1;
let spring1;
let gravity = 0
let drag = 0.99
let numVertices = 7
let radius = 250
let vertexRand = 130
let mouseSpeed;
let horizon;
let rot = 0
let mouths = []
let consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
let vowels = ['a','e','i','o','u']
let leftEye;
let mouthCounter = 0
let mouthSize = 0.8
let eyesDist = 0.22
let eyeSize = 0.95

function preload(){
  // restingFace = loadImage("Images/blobFace.png")
  hypermarket = loadFont('hypermarket-regular.ttf')

  openEyes = loadImage("blobFacialFeatures/openEyes.png")
  closedEyes = loadImage("blobFacialFeatures/closedEyes.png")

  leftEyeOpen = loadImage("blobFacialFeatures/leftOpen.png")
  rightEyeOpen = loadImage("blobFacialFeatures/rightOpen.png")

  leftEyeClosed = loadImage("blobFacialFeatures/leftClosed.png")
  rightEyeClosed = loadImage("blobFacialFeatures/rightClosed.png")

  mouthA = loadImage("blobFacialFeatures/mouths/A.png")
  mouthE = loadImage("blobFacialFeatures/mouths/E.png")
  mouthF = loadImage("blobFacialFeatures/mouths/F.png")
  mouthM = loadImage("blobFacialFeatures/mouths/M.png")
  mouthO = loadImage("blobFacialFeatures/mouths/O.png")
  mouthSH = loadImage("blobFacialFeatures/mouths/SH.png")
  
}

function setup() {
createCanvas(windowWidth+5, windowHeight+5); 
 
mouths.push(mouthM)
mouths.push(mouthA)
mouths.push(mouthE)
mouths.push(mouthF)
mouths.push(mouthO)
mouths.push(mouthSH)

  colorMode(HSB)
mouseSpeed = createVector(0,0)
guy1 = new Guy(400,400)

horizon = createVector(0,width)
  imageMode(CENTER)
  

leftEye = leftEyeOpen
rightEye = rightEyeOpen

setInterval(guy1.changeMouth,50)
setInterval(guy1.blink,600)
setInterval(guy1.speak,800)




}

function draw() {
  
     blendMode(BLEND)

  background(110,53,25);

  
  
if (mouseIsPressed){

  clearTimeout()
setTimeout(guy1.sleep,10000)
guy1.awake = true
mouseSpeed.set(mouseX-pmouseX,mouseY-pmouseY)
// print(mouseSpeed)

for (let i = 0;i<guy1.vertexArray.length;i++){
    if(p5.Vector.dist(guy1.vertexArray[i].pos, createVector(mouseX,mouseY))<40){
      
      guy1.vertexArray[i].vel.set(0,0)
      guy1.vertexArray[i].pos.set(mouseX,mouseY)
      
    }
}

  if (dist(mouseX,mouseY,guy1.center.x,guy1.center.y)<radius*2){
  for (let i = 0;i<guy1.vertexArray.length;i++){
    
    guy1.vertexArray[i].vel.set(p5.Vector.lerp(guy1.vertexArray[i].vel, 
                                               mouseSpeed,
                                               map(dist(guy1.vertexArray[i].pos.x,
                                                        guy1.vertexArray[i].pos.y,
                                                        mouseX,
                                                        mouseY,
                                                       ),
                                                  0,radius*1.2,0.05,0,true
                                                  
                                                  )
                                               ))
    
  }
  }
  


  
}

  // print(guy1.vertexArray[0].pos.angleBetween(guy1.vertexArray[floor(guy1.vertexArray.length/2)].pos))

//   fill(0)
//   noStroke()
//   textFont(hypermarket)
//   textSize(20)
//   text("AHwiubdaknqoaA$%^&*", 500,100)
guy1.show()  
guy1.update()



if (guy1.isSpeaking == false||guy1.awake == false)
    {
     mouth = mouths[0]
    //  print('notspeaking')
    }
else{mouth = mouths[mouthCounter]}

  blendMode(MULTIPLY)  

  strokeWeight(2)
  
if (guy1.awake==false){
  leftEye = leftEyeClosed
  rightEye = rightEyeClosed
}


  push()
    translate(p5.Vector.lerp(guy1.center,guy1.vertexArray[2].pos,eyesDist))
         rotation = atan2(guy1.vertexArray[0].pos.x -guy1.vertexArray[3].pos.x,
                          guy1.vertexArray[0].pos.y -guy1.vertexArray[3].pos.y)
        rotate(-rotation)
    image(leftEye,0,-27,210*eyeSize,150*eyeSize)
  pop()
  

  push()
    translate(p5.Vector.lerp(guy1.center,guy1.vertexArray[5].pos,eyesDist))
          rotation = atan2(guy1.vertexArray[0].pos.x -guy1.vertexArray[4].pos.x,
                           guy1.vertexArray[0].pos.y -guy1.vertexArray[4].pos.y)
        rotate(-rotation)
    image(rightEye,0,-30,210*eyeSize,150*eyeSize)
  pop()
  

  push()
    translate(guy1.center)
          rotation = atan2(guy1.vertexArray[0].pos.x -guy1.center.x,
                           guy1.vertexArray[0].pos.y -guy1.center.y)
        rotate(-rotation)
    image(mouth,0,50,210*mouthSize,150*mouthSize)
  pop()


  stroke(0)
     

  

  
// for (let i = 0; i < guy1.springArray.length;i++) {
//   guy1.springArray[i].show(i)
// }
  
// for (let i = 0; i < guy1.vertexArray.length;i++) {
//     guy1.vertexArray[i].show(i)
// }

  
}