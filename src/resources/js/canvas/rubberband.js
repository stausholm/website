const canvas = document.getElementById('canvas')
const parent = document.querySelector('.canvas-wrapper')


const init = () => {
  console.log('init rubberband')
  // parent.style.backgroundColor = 'transparent'
  // parent.style.marginTop = '0'
  // parent.style.height = '10rem'
  // parent.style.paddingTop = '5rem'
  // parent.style.paddingBottom = '5rem'

  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight

  const color = window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')

  const ctx = canvas.getContext('2d')
  ctx.lineWidth = 5
  ctx.strokeStyle = `rgb(${color})`
  ctx.beginPath()
  ctx.moveTo(0, canvas.height/2)
  ctx.bezierCurveTo(0, canvas.height/2, canvas.width, canvas.height/2, canvas.width, canvas.height/2)
  ctx.stroke()
}

export default init()