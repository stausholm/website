import "./main.scss";

import renderPosts from './js/post'
import renderAltPosts from './js/post-alt'
import renderFooter from './js/footer'

import switchTheme from './js/themeswitcher'

import toasts from './js/toasts'
import isIE from './js/detectIE'
import theNet from './js/theNet'
import initNav from './js/nav'


import rubberband2 from './js/canvas/rubberband2'
// import blast from './js/canvas/blast'

const init = () => {
  renderPosts('.posts')
  renderAltPosts('.posts--alt ul')
  renderFooter('footer nav')
  theNet('#the-net', '//pi.mortenstausholm.dk')
  initNav()

  window.toasts = new toasts()

  if (isIE()) {
    window.toasts.add('Achievement unlocked: View this website in a dead browser 🎉')
  }
  
}

init()

window.switchTheme = switchTheme
//switchTheme('red')