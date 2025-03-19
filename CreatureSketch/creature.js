class Food{
  constructor(foodX,foodY){
    this.foodX = randomGaussian(foodX,windowWidth/foodConcentration)
    this.foodY = randomGaussian(foodY,windowHeight/foodConcentration)
    this.xy = [this.foodX,this.foodY]
    this.size = 0.001
    this.growth = randomGaussian(
                      map(dist(this.foodX,this.foodY,growthX,growthY),0,(windowWidth/foodConcentration)*3,0.017,0.0006),
                  foodSizeRandomness)
    
    this.r = randomGaussian(
                      map(dist(this.foodX,this.foodY,growthX,growthY),0,(windowWidth/foodConcentration)*3,0,50),
                  colorRandomness)
    this.b = randomGaussian(
                      map(dist(this.foodX,this.foodY,growthX,growthY),0,(windowWidth/foodConcentration)*3,170,250),
                  colorRandomness)
    this.g = randomGaussian(
                      map(dist(this.foodX,this.foodY,growthX,growthY),0,(windowWidth/foodConcentration)*3,100,240),
                  colorRandomness)
    this.a = 255
  }
  
  show(){
    fill(this.r,this.g,this.b,this.a)
    ellipse(this.foodX,this.foodY,this.size)
  }
  
  grow(){
    this.size+=this.growth
    // this.b+=random(0,0.2)
    // this.g+=random(0,0.2)
    this.growth = this.growth * 0.997
  }
  
  eat(){
    this.size=this.size * 0.9
    return this.xy
  }
}

function createFood(){
  
    growthX = random(50,width-50)
    growthY = random(50,height-50)
    for (let i = 0; i<foodsAmount; i++)
      {foods[i] = new Food(growthX,growthY);}
  
  counter = foods.length-1
  }

let foods = [];
let tipX=[];
let tipY=[];
let rootX = 0
let rootY = 0
let c1x = 0 
let c1y = 0 
let c2x = 0 
let c2y = 0 
let x = 0
let y = 0 
let px = 0 
let py = 0
let curvy = 0
let velX = 1
let velY = 1
let tooCloseX = 0 
let tooCloseY = 0
let borderX = 0
let borderY = 0
let wiggleX = 0
let wiggleY = 0
let wig = 0
let preWiggleVelX = 0
let preWiggleVelY = 0
let wiggleSpeed = 0
let wiggleSize = 0
let goX = 0 
let goY = 0 
let wiggleLerp = 0
let angle = 0
let intentX = 0
let intentY = 0
let intentionX = 0
let intentionY = 0
let growthX = 0
let growthY = 0
let hungryX = 0
let hungryY = 0
let distRatio = 0
let headingX = 0
let headingY = 0
let eatingX = 0
let eatingY = 0
let counter = 0

let changeOfIntentionFreq = 100
let changeOfIntentionEnthusiasm = 0.005
let waveAmplitude = 0.8
let segments = 20
let setCurvy = 0.003
let jitter = 1
let jitterSpeed = 0.01
let borderforce = 3
let maxVel = 7
let limitSpeed = false
let turnSpeed = 3.5
let setWiggleSpeed = 4
let setWiggleSize = 4
let foodsAmount = 120
let foodConcentration = 25
let foodSizeRandomness = 0.002
let colorRandomness = 14
let eatDist = 200





function setup() {


  createCanvas(windowWidth+5, windowHeight+5);
  noCursor()
  frameRate(100)
  angleMode(DEGREES)

  x = width/2
  y = height/2
  borderY = 90
  borderX = 90
  intentX = random(50,width-50)
  intentY = random(50,height-50)

  
    
  createFood();
  
  // print(foods)
  
  for (let i = 0; i < segments; i++){
        tipX[i]= 0
        tipY[i]= 0  
        }
  
  
}

function draw() {
  
  background(0,0,0,255);
  strokeWeight(1)

  
    px = x 
    py = y
  
tooCloseX =  abs(map(width - x, width - borderX, width, 0, velX -borderforce ,true)) - 
                  map(x,width ,width - borderX, velX+borderforce, 0,true) 

tooCloseY =   abs(map(height - y, height - borderY, height, 0, velY -borderforce,true)) - 
                  map(y,height ,height - borderY, velY+borderforce, 0,true)
  


  
if(dist(x,y,intentX,intentY)<=changeOfIntentionFreq){
  intentX = random(50,width - 50)
  intentY = random(50,height - 50)
}
  
intentionX = lerp(intentionX,map(intentX - x,-width,width,-maxVel,maxVel,0),changeOfIntentionEnthusiasm)
intentionY = lerp(intentionY,map(intentY - y,-height,height,-maxVel,maxVel,0),changeOfIntentionEnthusiasm)
  
hungryX = lerp(hungryX,map(growthX -x,-width,width,-maxVel,maxVel,0),changeOfIntentionEnthusiasm)
hungryY = lerp(hungryY,map(growthY -y,-height,height,-maxVel,maxVel,0),changeOfIntentionEnthusiasm)


distRatio = (dist(x,y,growthX,growthY)**2)/((dist(x,y,growthX,growthY)**2)+(dist(x,y,intentX,intentY)**2))
  
distRatio=map(distRatio,0,1,-0.5,1.5)
distRatio=lerp(distRatio,constrain(distRatio,0,1),0.5)



// if (dist(x,y,growthX,growthY)<dist(x,y,intentX,intentY))
//   {
//   headingX = lerp(headingX,hungryX,0.1)
//   headingY = lerp(headingY,hungryY,0.1)
//   }
  
// if (dist(x,y,growthX,growthY)>dist(x,y,intentX,intentY))
//   {
//   headingX = lerp(headingX,intentionX,0.2)
//   headingY = lerp(headingY,intentionY,0.2)
//   }
  
  
headingX = lerp(hungryX,intentionX,(distRatio))
headingY = lerp(hungryY,intentionY,(distRatio))

//   goX = lerp(goX,
             
//              map(randomGaussian(velX,jitter),
//                                 velX-(3*jitter),
//                                 velX+(3*jitter),
                 
//               -maxVel,maxVel,limitSpeed),jitterSpeed)
  
//   goY = lerp(goY,
//              map(randomGaussian(velY,jitter),
//                                 velY-(3*jitter),
//                                 velY+(3*jitter),
                 
//               -maxVel,maxVel,limitSpeed),jitterSpeed)

  
//   goX = 1
//   goY = 0
  

  
 if (abs(preWiggleVelX) < 0.7 || 
     abs(preWiggleVelY) < 0.7 ||
     dist(x,y,intentX,intentY)<170||
     dist(x,y,growthX,growthY)<120
     )
   
   {wiggleLerp =lerp(wiggleLerp,1,0.2)}
  
  else{wiggleLerp = lerp(wiggleLerp,0,0.1)}
  
// print(preWiggleVelX,preWiggleVelY)
  

  

  preWiggleVelX = velX - wiggleX
  preWiggleVelY = velY - wiggleY
  
  angle = atan(preWiggleVelY/preWiggleVelX)
  
  wiggleX =
    
          lerp(
               -(wiggleSize*waveAmplitude)*sin(angle)*sin(wiggleSpeed*frameCount+90),
    
    
                lerp(sin(frameCount*wiggleSpeed) * wiggleSize,
                     cos(frameCount*wiggleSpeed) * wiggleSize,
                     
                     map(sin(frameCount*turnSpeed),-1,1,0,1)),
                
                wiggleLerp
              )        
              
  
  
  wiggleY =  
    
          lerp(
                (wiggleSize*waveAmplitude)*cos(angle)*sin(wiggleSpeed*frameCount+90),
    
                lerp(cos(frameCount*wiggleSpeed) * wiggleSize,
                     sin(frameCount*wiggleSpeed) * wiggleSize,
                     
                     map(sin(frameCount*turnSpeed),-1,1,0,1)),
    
                wiggleLerp
              )
    
                
  

  
  velX =
    
      // goX 
      
//       +intentionX
  
//       +hungryX
    
      +headingX
    
      +tooCloseX
  
      +wiggleX
  
      
  
  
  
  velY = 
       // goY 
  
//       +intentionY
  
//       +hungryY
    
      +headingY
    
      +tooCloseY 
  
      +wiggleY
  
  
  
  x = x + velX
  y = y + velY
  
    if (foods.length==0){createFood()}
  
    for (let i = 0; i<foods.length; i++){
    foods[i].show();
    foods[i].grow()
    }

curvy = setCurvy
wiggleSpeed =setWiggleSpeed
wiggleSize =setWiggleSize
  
    if(dist(x,y,growthX,growthY)<eatDist&&foods.length>0){

      // print(foods,counter)
          foods[counter].eat()
          
           let xy = foods[counter].eat()
          // print(xy[0],xy[1])
           
    
           x = xy[0]
           y = xy[1]
           
           foods.splice(counter,1)
      
           counter-=counter
            curvy = setCurvy/2.5
            wiggleSpeed = setWiggleSpeed/2
            wiggleSize = setWiggleSize/3

      
        }
  

  

  
  for (let i = 0; i < segments; i++){
  
    
  tipX[(segments)] = x
  tipY[(segments)] = y
    
    
  c1x = lerp(c1x,tipX[i],curvy*1.6)
  c1y = lerp(c1y,tipY[i],curvy*1.6)
  c2x = lerp(c2x,c1x,curvy)
  c2y = lerp(c2y,c1y,curvy)
  rootX = lerp(rootX,c2x,curvy)
  rootY = lerp(rootY,c2y,curvy)
    
  tipX[i] = tipX[i +1]
  tipY[i] = tipY[i +1]
    
  let wave = sin(map(i,0,segments - 1,0,PI))*100
    
  stroke(255,60,60,150)
  
        noFill(0)
    
          strokeWeight(0.7)

bezier(tipX[i], tipY[i],c1x, c1y,c2x, c2y, rootX, rootY)
    

    stroke(100,100,60)
    fill (0,0,0)
          strokeWeight(0.7)

      ellipse(tipX[i],tipY[i],3)
    
    
        noStroke()

  
    fill(150,80,80)
      ellipse(rootX,rootY,16)
    
    
        
    
  


  }
  fill(180,180,255)
      ellipse(rootX,rootY,8)
  fill(0,0,0)
      ellipse(rootX,rootY,4)
  
  
  
//   fill(255,255,255)
//   ellipse(intentX,intentY,15)
  
//   fill(255,0,0)
//   ellipse(growthX,growthY,15)
  
}