const canvas = document.getElementById('canvas')
const parent = document.querySelector('.canvas-wrapper')
const ctx = canvas.getContext('2d')

let line;

const resizer = () => {
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
}

const init = () => {
  console.log('init rubberband')

  window.addEventListener('resize', resizer)
  resizer()

  const color = window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')

  const defaultSpacing = parseFloat(getComputedStyle(document.documentElement).fontSize)



  line = new Line()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  line.update()
}

function Line() {
  const color = window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')

  const defaultSpacing = parseFloat(getComputedStyle(document.documentElement).fontSize)

  const line = {
    start: { x: defaultSpacing, y: canvas.height/2 },
    cp1:   { x: defaultSpacing, y: canvas.height/2 },
    cp2:   { x: canvas.width - defaultSpacing, y: canvas.height/2 },
    end:   { x: canvas.width - defaultSpacing, y: canvas.height/2 }
  }

  this.start = line.start
  this.cp1 = line.cp1
  this.cp2 = line.cp2
  this.end = line.end
  this.color = `rgb(${color})`
  this.lineWidth = 5

  this.gravityPull = 1
  this.friction = 0
  this.dy = 1// y velocity
  this.dx = 4 // x velocity

  this.up = false
}

Line.prototype.draw = function() {
  ctx.lineWidth = this.lineWidth
  ctx.strokeStyle = this.color
  ctx.beginPath()
  ctx.moveTo(this.start.x, this.start.y)
  ctx.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.end.x, this.end.y)
  ctx.stroke()
}

Line.prototype.update = function() {
  const maxStretchY = 100
  const startPos = canvas.height/2

  if (this.cp1.y <= startPos - maxStretchY || this.cp1.y >= startPos + maxStretchY) {
    this.dy = -this.dy
    console.log(this.cp1.y, startPos, 'flip')
    this.up = !this.up
  } else {
    this.dy += 1
    console.log(this.cp1.y, this.dy)
    // this.dy = this.up ? this.dy - 1 : this.dy + 1
  }

  //this.up ? this.cp1.y -= this.dy : this.cp1.y += this.dy
  // this.cp2.y = this.up ? this.cp2.y - this.dy : this.cp2.y + this.dy
  // this.cp1.y <= startPos - maxStretchY ? this.cp1.y += this.dy : this.cp1.y -= this.dy
  // this.cp1.y <= startPos - maxStretchY ? this.cp2.y += this.dy : this.cp2.y -= this.dy
  this.cp1.y += this.dy
  // this.cp2.y += this.dy
  this.draw()
}

export default init()