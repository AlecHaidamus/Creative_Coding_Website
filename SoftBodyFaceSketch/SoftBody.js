class Guy{
    constructor(x,y){
      this.numVertices = numVertices
      this.pos = createVector(x,y)
      this.vertexArray = []
      this.springArray = []
      this.radius = radius
      this.center = createVector(x,y)
      this.numSprings = 0

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
let kDistFactor = 0.002
let restLengthDistFactor = 0.005
let initVertSpeed = 0.3
let guy1;
let spring1;
let gravity = 0
let drag = 0.99
let numVertices = 7
let radius = 150
let vertexRand = 130
let mouseSpeed;
let horizon;
let rot = 0

function preload(){
  restingFace = loadImage("Images/blobFace.png")
  hypermarket = loadFont('hypermarket-regular.ttf')
  
}

function setup() {

createCanvas(windowWidth, windowHeight); 
 
  colorMode(HSB)
mouseSpeed = createVector(0,0)
guy1 = new Guy(400,400)

horizon = createVector(0,width)
  imageMode(CENTER)
  

}

function draw() {
  
     blendMode(BLEND)

  background(110,53,25);

  
  
if (mouseIsPressed){
  
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
  
  
guy1.update()
guy1.show()

  blendMode(MULTIPLY)  

  strokeWeight(2)
  push()
  
  translate(guy1.center.x,guy1.center.y)

  let rotation = atan2( guy1.vertexArray[0].pos.x -guy1.center.x,
                       guy1.vertexArray[0].pos.y -guy1.center.y)
  
  rotate(-rotation)
  // print(-rotation)

  image(restingFace,0,0,130,100)
  pop()
  
  stroke(0)
     

  

  
// for (let i = 0; i < guy1.springArray.length;i++) {
//   guy1.springArray[i].show(i)
// }
  
// for (let i = 0; i < guy1.vertexArray.length;i++) {
//     guy1.vertexArray[i].show(i)
// }

  
}