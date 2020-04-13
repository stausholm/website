import icons from '../content/icons'
import blast from './canvas/blast'

const selectorContainer = document.querySelector('.game-selector')
const heroContent = document.querySelector('.hero-content')
const heroDivider = document.querySelector('.hero-content .divider')
const page = document.querySelector('.page')
const pageHead = document.querySelector('.page-head')

const games = [
  {
    id: 1,
    title: 'Blast particles',
    description: 'Click to blast',
    icon: icons.touchApp,
    active: false,
    init: function() {
      blast.init()
    },
    exit: function() {
      blast.exit()
      resetGameCanvas()
    }
  },
  {
    id: 2,
    title: 'game 2',
    description: 'a short description',
    icon: icons.touchApp,
    active: false,
    init: function() {
      pageHead.classList.add('page-head--large')
    },
    exit: function() {
      setTimeout(() => {
        pageHead.classList.remove('page-head--large')
      }, 300)
      resetGameCanvas()
    }
  },
  {
    id: 3,
    title: 'game 3',
    icon: icons.touchApp,
    active: false,
    init: function() {

    },
    exit: function() {
      resetGameCanvas()
    }
  },
  {
    id: 4,
    title: 'game 4',
    icon: icons.touchApp,
    active: false,
    init: function() {

    },
    exit: function() {
      resetGameCanvas()
    }
  }
]

const resetGameCanvas = () => {
  console.log('resetting game canvas')
  const canvasOld = document.getElementById('game')
  const canvasNew = document.createElement('canvas')
  const canvasWrapper = canvasOld.parentNode
  canvasNew.id = 'game'
  canvasWrapper.replaceChild(canvasNew, canvasOld)
}


export default function initGameSelector() {  
  games.forEach(item => {
    const elWrapper = document.createElement('div')
    elWrapper.classList.add('game-icon')
    
    const el = document.createElement('div')
    el.classList.add('game-icon__inner')
    el.title = item.title
    el.setAttribute('data-game-id', item.id)

    el.innerHTML = `<div class="icon-wrapper">${item.icon}</div>`

    el.addEventListener('click', e => {
      e.preventDefault()
      item.active = true
      item.init()
      document.body.classList.add('page-moved')
      page.classList.add('page-move')
      const pageHeadContent = document.querySelector('.page-head .page-head__inner .content-wrapper')
      pageHeadContent.innerHTML = `<h1>${item.title}</h1><p>${item.description || ''}</p>`
    })
    elWrapper.appendChild(el)
    selectorContainer.appendChild(elWrapper)
  })

  const pageHeadClose = document.querySelector('.page-head .close')
  pageHeadClose.addEventListener('click', e => {
    const activeGame = games.find(x => x.active)

    if (activeGame && activeGame.exit) {
      activeGame.active = false
      activeGame.exit()
    }
    document.body.classList.remove('page-moved')
    page.classList.remove('page-move')
  })

  // page.addEventListener('click', e => {
  //   if(page.classList.contains('page-move')) {
  //     document.body.classList.remove('page-moved')
  //     page.classList.remove('page-move')
  //   }
  // })

  let ctaTimerFunc = null
  const gameCTA = document.createElement('div')
  gameCTA.classList.add('game-cta')
  gameCTA.innerHTML = icons.list // icons.touchApp
  gameCTA.addEventListener('click', e => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('gameBoardToggle'))

    gameCTA.classList.add('animating')
    clearTimeout(ctaTimerFunc)
    ctaTimerFunc = setTimeout(() => {
      gameCTA.classList.remove('animating')
    }, 300)
  })
  heroContent.appendChild(gameCTA)
  
  // const gameCTA = document.createElement('div')
  // gameCTA.classList.add('game-cta--alt')
  // gameCTA.innerHTML = icons.list // icons.touchApp
  // gameCTA.innerHTML += '<span>A button</span>'
  // gameCTA.addEventListener('click', e => {
  //   e.preventDefault()
  //   window.dispatchEvent(new CustomEvent('gameBoardToggle'))
  // })
  // heroContent.insertBefore(gameCTA, heroDivider)
}