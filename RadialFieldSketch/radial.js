let columns = 45
let rows = 90
let noiseCoordFactor = 80
let length = 600
let smoothing = 50
let speed = 0.004
let indices = [];
let radius = 3
let smoothMouseX = 0 
let smoothMouseY = 0 
let mouseSmooth = 0.3
let pullRadius = 0.1
let maxPull = -2
let rotcounter = 0
let scalee = 0.5


let distance = 0 
// let vals = [];


function setup() {
  createCanvas(windowWidth+5, windowHeight+5);
  angleMode(DEGREES)
  function clearLast(){
  indices.pop()
  }
    setInterval(clearLast, 2)
  
  

  
}
let counter = 0
function draw() {
   background(0,0,0,1);
   noFill();
  colorMode(HSB)
  
  translate((width/2),(height/2))
    scale(scalee)
    


  
    strokeWeight(1.15)
    stroke(0,100,90)
  
  
  smoothMouseX = lerp(smoothMouseX,mouseX - ((width/rows)/2) ,mouseSmooth) 
  smoothMouseY = lerp(smoothMouseY,mouseY -((height/columns)/2),mouseSmooth) 
  
  translate((width/rows)/2,(height/columns)/2)
    
      let counter = 0


    for(let x = 0; x < columns; x++){
    for(let y = 0; y < rows; y++){
      
    
            // vals[counter] = 0

      counter++
      
      



      let n = noise(x/noiseCoordFactor,y/noiseCoordFactor,frameCount*speed)
      let nc1 = noise(x/noiseCoordFactor,y/noiseCoordFactor,((frameCount - (smoothing/3)) *speed))
      let nc2 = noise(x/noiseCoordFactor,y/noiseCoordFactor,(frameCount - ((smoothing/3)*2)) *speed)
      let nE = noise(x/noiseCoordFactor,y/noiseCoordFactor,(frameCount - smoothing) *speed)

      
       
      
      stroke(
        (map(nE,0,1,360,120)),
        100,
        100,
        0.2)

      rootX = (x * width)/columns 
      rootY = (y * height/(rows)) 



      EndX = rootX + cos(map(nE,0,1,-360,360)) * length
      EndY = rootY + sin(map(nE,0,1,-360,360)) * length
      
  
            
      control1X  = rootX + cos(map(nc1,0,1,-360,360)) * (length/3)
      control1Y  = rootY + sin(map(nc1,0,1,-360,360)) * (length/3)
      
      control2X  = rootX + cos(map(nc2,0,1,-360,360)) * ((length/3)*2)
      control2Y  = rootY + sin(map(nc2,0,1,-360,360)) * ((length/3)*2)
      
if(
        smoothMouseX > (x - radius) * (width/columns) &&
        smoothMouseX < (x + radius) * (width/columns) + width /columns+1 &&
        smoothMouseY > (y - radius) * (height/rows) &&
        smoothMouseY < (y + radius) * (height/rows) + height /rows 
        )
        {
          
          // vals[counter] = 1
      
        if (indices.includes(counter)==false){
          
        indices.unshift(counter)}
        }
      
        if (indices.includes(counter))
          
//         if (vals[counter] == 1)
         {
           
         }
             distance = dist(rootX,rootY,smoothMouseX,smoothMouseY)

      //print(indices)
  

      //ellipse(smoothMouseX,smoothMouseY, 10)
      
      bezier(
      rootX,
      rootY,
      control1X,
      control1Y,
      control2X,
      control2Y,
      EndX,
      EndY

        
        
      )
      rotate(asin(rotcounter))
      rotcounter +=0.000000001
      scalee = scalee*0.99999999999999
      
      
     
      

      
      
      // ellipse(rootX, rootY,2)
      // ellipse(control1X,control1Y,2 )
      // ellipse(control2X,control2Y,2 )
      // ellipse(EndX,EndY,2)
      
      
    }}
        // translate(-(width/2),(height/2))

  
}