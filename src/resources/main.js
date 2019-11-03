import "./main.scss";

import renderPosts from './js/post'
import renderAltPosts from './js/post-alt'
import renderFooter from './js/footer'

const init = () => {
  renderPosts('.posts')
  renderAltPosts('.posts--alt ul')
  renderFooter('footer nav')
}

init()