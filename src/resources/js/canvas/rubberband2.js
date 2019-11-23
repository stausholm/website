const canvas = document.getElementById('canvas')
const parent = document.querySelector('.canvas-wrapper')
const ctx = canvas.getContext('2d')

let points = [];
let rafID = null;

const config = {
  totalPoints: 6,
  viscosity: 20,
  mouseDist: 70,
  damping: 0.15,
  // color: '#f21b5f',
  color: `rgb(${window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')})`,

  // DEBUG
  showIndicators: true,
  showMouse: true,
  showCanvas: true
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
    scrollY = 0
    init = 0;  

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
  // don't prevent scrolling page if touching outside line boundaries
  const rect = e.target.getBoundingClientRect();
  const x = e.targetTouches[0].clientX - rect.left; // TODO: x start boundaries
  const y = e.targetTouches[0].clientY - rect.top;

  const touchStartBoundaries = {
    top: canvas.height/2 - 20,
    bottom: canvas.height/2 + 20
  }
  if (y > touchStartBoundaries.top && y < touchStartBoundaries.bottom) {
    // prevent page from scrolling
    e.preventDefault();
  }
}
canvas.ontouchend = function(e) {
  mouseLeave()
}


let scrolling = false
let scrollDebounced = null
window.addEventListener('scroll', e => {
  scrolling = true

  clearTimeout(scrollDebounced)
  scrollDebounced = setTimeout(finishScroll, 50)
})

function finishScroll() {
  scrolling = false
  mouseY = canvas.height/2 // reset y back to 0, so we have a 0 starting point when switching scroll direction
}




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




function initCanvas() {
  cancelAnimationFrame(rafID);

  // Resize canvas
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;

  // Add points
  points = [];
  const gap = (canvas.width / (config.totalPoints - 1));
  const pointY = canvas.height / 2;

  for (let i = 0; i <= config.totalPoints - 1; i++) {
    points.push(new Point(i * gap, pointY, canvas));
  }

  init = 1

  // Start render
  renderCanvas();

  canvas.setAttribute('data-gap', gap);
}




function renderCanvas() {
  // rAF
  rafID = requestAnimationFrame(renderCanvas);

  if (init === 1) {
    // perform bounce animation on initial page load
    mouseDirectionY = 1
    mouseY = canvas.height/2 + 40 // 40 is just some random number that made a big enough bounce
    mouseX = canvas.width/2
    init++
  } else if (init === 10) {
    mouseLeave()
    init++
  } else if (init < 10) {
    init++
  }


  // Clear scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // simulate mouse movement on scroll
  if (scrolling) {
    const center = {
      x: canvas.width/2,
      y: canvas.height/2
    }
  
    mouseX = center.x
    if (mouseY === mouseOffY) {
      // mouseLeave() has been called, so we make sure to center mouseY before adding/subtracting distance
      mouseY = center.y
    }
  
    if (scrollY < window.pageYOffset) {
      mouseDirectionY = -1
      if (mouseY < center.y - config.mouseDist) {
        mouseY = center.y - config.mouseDist
      } else {
        mouseY -= 5
      }
    } else if (scrollY > window.pageYOffset) {
      mouseDirectionY = 1
      if (mouseY > center.y + config.mouseDist) {
        mouseY = center.y + config.mouseDist
      } else {
        mouseY += 5
      }
    } else {
      mouseDirectionY = 0
    }

    scrollY = window.pageYOffset
  }

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

    ctx.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
  }

  ctx.stroke()

  // DEBUG
  if(debugFunc) debugFunc()
}




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
    gui.add(config, 'showMouse');
    gui.add(config, 'showCanvas');
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
    if (config.showCanvas) {
      canvas.style.backgroundColor = "rebeccapurple"
    } else {
      canvas.style.backgroundColor = ""
    }
    if (config.showMouse) {
      ctx.arc(mouseX, mouseY, 4, 0, 2*Math.PI)
      ctx.fill()
    }
  }
}