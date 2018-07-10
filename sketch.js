var max = 25;
var painting = false;

var droplets = [];
var auto,follow = false;

function setup() {
  createCanvas(720, 720);
  strokeWeight(1);
  stroke(1);
  background(55);

  var button = createButton('Auto');
  button.position(750 + 0, 0);
  button.mousePressed(SetAuto);
  var button = createButton('Semi-Auto');
  button.position(750, 25);
  button.mousePressed(SetFollow);

}

function SetAuto()
{
  auto = !auto;
}

  function SetFollow()
{
  follow = !follow;
}

function draw() {

  for (var i = 0; i < droplets.length; i++)
  {
    droplets[i].update();
    droplets[i].display();

    var gravity = createVector(0, 0.1*droplets[i].mass);
    droplets[i].applyForce(gravity);
    droplets[i].update();
    droplets[i].display();
  }

  if(auto)
  {
    Auto(0,0);
  }

  if (follow & painting) {
    droplets[droplets.length] = new WaterDrop(mouseX, mouseY,random(-10,10), random(-10,10), 0);
  }

}

function mousePressed() {
  painting = true;
  CreateWaterDrop(5,20);

}

function mouseReleased() {
  painting = false;
}

function reset() {
  for (var i = 0; i < 9; i++) {
    droplets[i] = new WaterDrop(random(0.5, 10), 40+i*70, 0);
  }
}

function CreateWaterDrop(a,b)
{
  droplets[droplets.length] = new WaterDrop(mouseX, mouseY,random(-10,10), random(-10,10), 0);
}

function Auto(a,b)
{
  droplets[droplets.length] = new WaterDrop(random(0,720), 0, random(-10,10), random(-10,10), 0);
}


function WaterDrop(x,y,a,b, seed)
{
  this.a = a;
  this.b = b;
  this.t = 0;
  this.acceleration= 0.01;
  this.mass = 1;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}



WaterDrop.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

WaterDrop.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  this.t+=.001;
  // position changes by velocity
  x = Math.sin((this.t* this.position.y) * Math.cos(this.t * this.position.y)) *random(-5, 5);
  this.velocity.x = x;
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);

};

WaterDrop.prototype.display = function() {
  var c = color(171,223,246, 100);
  beginShape();
  fill(c);
  strokeWeight(0);

  for (var i = -10; i < 10; i++) {
    x = this.position.x + (this.a*((1-Math.sin(i))*Math.cos(i)));
    y = this.position.y + -(this.b*(Math.sin(i) - 1));
    point(x, y);
    curveVertex(x, y);
  }
  endShape();

};
