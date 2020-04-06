import icons from '../content/icons'
import blast from './canvas/blast'

const selectorContainer = document.querySelector('.game-selector')
const heroContent = document.querySelector('.hero-content')
const games = [
  {
    id: 1,
    title: 'game 1',
    icon: icons.touchApp,
    active: false,
    init: function() {
      blast()
    },
    exit: function() {

    }
  },
  {
    id: 2,
    title: 'game 2',
    icon: icons.touchApp,
    active: false,
    init: function() {

    },
    exit: function() {

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

    }
  }
]


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
      document.querySelector('.page').classList.add('page-move')
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
    document.querySelector('.page').classList.remove('page-move')
  })

  const gameCTA = document.createElement('div')
  gameCTA.classList.add('game-cta')
  gameCTA.innerHTML = icons.list // icons.touchApp
  gameCTA.addEventListener('click', e => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('gameBoardToggle'))
  })
  heroContent.appendChild(gameCTA)
}