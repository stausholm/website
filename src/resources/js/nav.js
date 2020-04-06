import switchTheme from '../js/themeswitcher'

const header = document.querySelector('.header-nav')
const nav = [
  {
    id: 1,
    text: '01.',
    active: true,
    title: 'Go to 01',
    init: function(el) {
      switchTheme('purple')
    },
    exit: function(el, initiatorEl) {
      console.log('exit nav item 1')
    }
  },
  {
    id: 2,
    text: '02.',
    title: 'Go to 02',
    init: function(el) {
      switchTheme('red')
      
      document.body.classList.add('page-moved')
      document.querySelector('.page').classList.add('page-move')
    },
    exit: function(el, initiatorEl) {
      document.body.classList.remove('page-moved')
      document.querySelector('.page').classList.remove('page-move')
    }
  },
  {
    id: 3,
    text: '03.',
    title: 'Go to 03',
    init: function(el) {
      switchTheme('green')
      document.body.classList.add('page-moved')
      document.querySelector('.page').classList.add('page-move')
    },
    exit: function(el, initiatorEl) {
      document.body.classList.remove('page-moved')
      document.querySelector('.page').classList.remove('page-move')
    }
  },
  {
    id: 4,
    text: '04.',
    title: 'Go to 04',
    init: function(el) {
      switchTheme('blue')

    },
    exit: function(el, initiatorEl) {
      document.body.classList.remove('page-moved')
      document.querySelector('.page').classList.remove('page-move')
    }
  }
]

export default function initNav() {
  nav.forEach(item => {
    const el = document.createElement('a')
    el.href = '#'
    el.title = item.title
    el.textContent = item.text
    el.setAttribute('data-nav-id', item.id)
    if (item.active) {
      el.classList.add('active')
      item.init()
    }
    el.addEventListener('click', e => {
      e.preventDefault()
      const currentActive = document.querySelector('.header-nav a.active')
      if (currentActive === el) {
        console.log('clicked on the already selected el')
      }
      currentActive.classList.remove('active')
      const currentActiveNavItem = nav.find(x => x.id === parseInt(currentActive.getAttribute('data-nav-id')))
      if (currentActiveNavItem && currentActiveNavItem.exit) {
        currentActiveNavItem.exit(currentActive, el)
      }
      el.classList.add('active')
      item.init(el)
    })
    header.appendChild(el)
  })

  const pageHeadClose = document.querySelector('.page-head .close')
  pageHeadClose.addEventListener('click', e => {
    const currentActive = document.querySelector('.header-nav a.active')
    const currentActiveNavItem = nav.find(x => x.id === parseInt(currentActive.getAttribute('data-nav-id')))
      if (currentActiveNavItem && currentActiveNavItem.exit) {
        currentActiveNavItem.exit(currentActive, pageHeadClose)
      }
  })
}