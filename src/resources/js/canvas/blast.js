import {random} from '../utils'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let blast;
let count = 0;

const mouse = {
  x: 0,
  y: 0
}
function mouseClick(e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;

  blast = new Blast(mouse.x, mouse.y, 'white', undefined, 6)
}
canvas.addEventListener('click', mouseClick);



const init = () => {
  console.log('init blast')
  canvas.width = canvas.parentNode.offsetWidth;
  canvas.height = canvas.parentNode.offsetHeight;

  //blast = new Blast(100, 100, 'white', undefined, 6)
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (blast && blast.isActive) {
    console.log('running blast')
    if (++count > 2) { // make it 30fps
      blast.update()
      count = 0
    } else {
      blast.draw()
    }
  } else {
    blast = null
  }
}


function Blast(x, y, color, size, particleCount) {
  this.isActive = true
  this.particles = [...Array(particleCount)].map(particle => {return new BlastParticle(x, y, color, size)})
}

Blast.prototype.draw = function() {
  this.particles.forEach(particle => {
    particle.draw()
  })
}

Blast.prototype.update = function() {
  if (!this.isActive) return 
  
  this.particles.forEach(particle => {
    particle.update()
  })

  this.isActive = this.particles.filter(x => x.isActive).length > 0
}


function BlastParticle(x, y, color, size = 50) {
  this.isActive = true
  this.x = x
  this.y = y
  this.color = color
  this.size = random(size/5, size)
  this.speedX = random(-(size/10), (size/10))
  this.speedY = random(-(size/10), (size/10))
  // this.speedX = random(-5, 5)
  // this.speedY = random(-5, 5)
  this.drag = .92
  //this.wander = .15
  this.theta = random(0, 360) * Math.PI / 180
}

BlastParticle.prototype.draw = function() {
  ctx.fillStyle = this.color
  ctx.fillRect(this.x, this.y, this.size, this.size)
  // ctx.rect(this.x, this.y, this.size, this.size);
  // ctx.fill();
  // ctx.beginPath()
  // ctx.rect(this.x, this.y, this.size, this.size);
  // ctx.fillStyle = this.color
  // ctx.fill()
  // ctx.closePath()
  
  // ctx.beginPath()
  // ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
  // ctx.fillStyle = this.color
  // ctx.fill()
  // ctx.closePath()
}

BlastParticle.prototype.update = function() {
  this.x += this.speedX
  this.y += this.speedY
  this.speedX *= this.drag
  this.speedY *= this.drag
  this.theta += random(-.5, .5)
  this.speedX += .1 * Math.sin(this.theta)
  this.speedY += .1 * Math.cos(this.theta)
  this.size *= .8

  if (.1 > this.size) {
    // stop
    return this.isActive = false
  }
  this.draw()
}

export default init