import "./main.scss";

import renderPosts from './js/post'
import renderAltPosts from './js/post-alt'
import renderFooter from './js/footer'

import switchTheme from './js/themeswitcher'

import rubberband from './js/canvas/rubberband'

const init = () => {
  renderPosts('.posts')
  renderAltPosts('.posts--alt ul')
  renderFooter('footer nav')
}

init()

window.switchTheme = switchTheme
//switchTheme('red')