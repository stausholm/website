const canvas = document.getElementById('canvas')
const parent = document.querySelector('.canvas-wrapper')
const ctx = canvas.getContext('2d')

let points = [];
let rafID = null;

const config = {
  totalPoints: 6,
  viscosity: 20,
  mouseDist: 80,
  damping: 0.15,
  showIndicators: true,
  // color: '#f21b5f',
  color: `rgb(${window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')})`
};

const DEBUG = true
let debugFunc = null



/**
 * Mouse handler
 */
let mouseX = 0,
    mouseY = 0,
    mouseLastX = 0,
    mouseLastY = 0,
    mouseDirectionX = 0,
    mouseDirectionY = 0,
    mouseSpeedX = 0,
    mouseSpeedY = 0,
    mouseOffX = -1000,
    mouseOffY = 0,
    scrollY = 0;  

// Get mouse direction
function mouseDirection(e) {
  if (mouseX < e.offsetX)
    mouseDirectionX = 1;
  else if (mouseX > e.offsetX)
    mouseDirectionX = -1;
  else
    mouseDirectionX = 0;

  if (mouseY < e.offsetY)
    mouseDirectionY = 1;
  else if (mouseY > e.offsetY)
    mouseDirectionY = -1;
  else
    mouseDirectionY = 0;

  mouseX = e.offsetX;
  mouseY = e.offsetY;
}
canvas.addEventListener('mousemove', mouseDirection);

function mouseLeave() {
  mouseX = mouseOffX
  mouseY = mouseOffY
}
canvas.addEventListener('mouseleave', mouseLeave)


// Get mouse speed
function mouseSpeed() {
  mouseSpeedX = mouseX - mouseLastX;
  mouseSpeedY = mouseY - mouseLastY;

  mouseLastX = mouseX;
  mouseLastY = mouseY;

  setTimeout(mouseSpeed, 50);
}
mouseSpeed();


canvas.ontouchmove = function(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.targetTouches[0].clientX - rect.left;
  const y = e.targetTouches[0].clientY - rect.top;
  //console.log(x, y, rect)
  if (mouseX < x)
    mouseDirectionX = 1;
  else if (mouseX > x)
    mouseDirectionX = -1;
  else
    mouseDirectionX = 0;

  if (mouseY < y)
    mouseDirectionY = 1;
  else if (mouseY > y)
    mouseDirectionY = -1;
  else
    mouseDirectionY = 0;

  mouseX = x;
  mouseY = y;
}
canvas.ontouchstart = function(e) {
  e.preventDefault();
}
canvas.ontouchend = function(e) {
  mouseLeave()
}


let scrollDebounced = null
window.addEventListener('scroll', e => {
  // get center of canvas and assign mouseX and mouseY to it
  // if scrolling down the page, decrease mouseY and update mouseDirectionY
  // if scrolling up, increase mouseY and update mouseDirectionY
  // based on scrollspeed, do same logic as mouseSpeed()

  clearTimeout(scrollDebounced)
  scrollDebounced = setTimeout(updateScroll, 50)

  const center = {
    x: canvas.width/2,
    y: canvas.height/2
  }

  mouseX = center.x
  mouseY = center.y

  // TODO: only update mouseY if scrolling fast enough
  if (scrollY < window.pageYOffset) {
    mouseDirectionY = 1
    mouseY += 40
    // mouseY = canvas.width/2 + 40
    console.log('++', mouseY)
  } else if (scrollY > window.pageYOffset) {
    console.log('-- before', mouseY)
    mouseDirectionY = -1
    mouseY -= 40
    // mouseY = canvas.width/2 - 40
    console.log('--', mouseY)
  } else {
    mouseDirectionY = 0
  }

  scrollY = window.pageYOffset
})

function updateScroll() {
  console.log('updated')
  mouseLeave()
}



/**
 * Point
 */
function Point(x, y, canvas) {
  this.x = x;
  this.ix = x;
  this.vx = 0;
  this.cx = 0;
  this.y = y;
  this.iy = y;
  this.vy = 0;
  this.cy = 0;
  this.canvas = canvas;
}

Point.prototype.move = function() {
  this.vy += (this.iy - this.y) / config.viscosity

  const dx = this.ix - mouseX
  const dy = this.y - mouseY

  const gap = this.canvas.getAttribute('data-gap');
  
  if ((mouseDirectionY > 0 && mouseY > this.y) || (mouseDirectionY < 0 && mouseY < this.y)) {
    if (Math.sqrt(dy * dy) < config.mouseDist && Math.sqrt(dx * dx) < gap) {
      this.vy = mouseSpeedY / 10
    }
  }

  this.vy *= (1 - config.damping);
  this.y += this.vy;
};





/**
 * Init canvas
 */
function initCanvas() {
  cancelAnimationFrame(rafID);

  // Resize canvas
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;

  // Add points
  points = [];
  const gap = (canvas.width / (config.totalPoints - 1));
  const pointY = canvas.height / 2;

  for (let i = 0; i <= config.totalPoints - 1; i++)
    points.push(new Point(i * gap, pointY, canvas));

  // Start render
  renderCanvas();

  canvas.setAttribute('data-gap', gap);
}





/**
 * Render canvas
 */
function renderCanvas() {
  // rAF
  rafID = requestAnimationFrame(renderCanvas);

  // Clear scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move points
  for (let i = 0; i <= config.totalPoints - 1; i++)
    points[i].move();

  // Draw shape
  ctx.strokeStyle = config.color;
  ctx.lineWidth = 5;
  ctx.beginPath();

  ctx.moveTo(0, canvas.height / 2);

  for (let i = 0; i <= config.totalPoints - 1; i++) {
    const p = points[i];

    if (points[i + 1] != undefined) {
      p.cx = (p.x + points[i + 1].x) / 2 - 0.0001; // - 0.0001 hack to fix a 1px offset bug on Chrome...
      p.cy = (p.y + points[i + 1].y) / 2;
    } else {
      p.cx = p.ix;
      p.cy = p.iy;
    }
    
    // if (i == 2) {
    //   console.log(p)
    // }

    ctx.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
  }

  ctx.stroke()

  // DEBUG
  if(debugFunc) debugFunc()
}




/**
 * Resize handler
 */
function resizeHandler() {
  initCanvas();
}
window.addEventListener('resize', resizeHandler);
resizeHandler()





/**
 * Debug
 */
if(DEBUG) {
  const addScript = src => {
    const s = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);
  }
  addScript('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js')

  window.addEventListener('load', () => {
    const gui = new dat.GUI();
    gui.add(config, 'showIndicators');
    const controller = gui.add(config, 'totalPoints', 2, 20).step(1);
    gui.add(config, 'viscosity', 10, 500);
    gui.add(config, 'mouseDist', 20, 400);
    gui.add(config, 'damping', 0.01, 0.5);
    gui.addColor(config, 'color');
  
    controller.onChange(function() {
      cancelAnimationFrame(rafID);
      initCanvas();
    });
  })

  debugFunc = () => {
    if (config.showIndicators) {
      // Draw points
      ctx.fillStyle = '#000';
      ctx.beginPath();
      for (let i = 0; i <= config.totalPoints - 1; i++) {
        const p = points[i];
  
        ctx.rect(p.x - 2, p.y - 2, 4, 4);
      }
      ctx.fill();
  
      // Draw controls
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      for (let i = 0; i <= config.totalPoints - 1; i++) {
        const p = points[i];
  
        ctx.rect(p.cx - 1, p.cy - 1, 2, 2);
      }
      ctx.fill();
    }
  }
}