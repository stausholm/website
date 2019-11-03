import renderMarkup from './_renderer'
import posts from '../content/posts-alt'

const createPostMarkup = post => {
  return `
  <li>
    <a href="${post.link}" title="Explore ${post.title}">
      <div class="linkwrapper">
        <span class="headtext">${post.title}</span>
        <br>
        <span class="subtext">${post.description}</span>
      </div>
      <div class="arrow-icon ${post.isExternal ? 'rotate' : ''}" aria-hidden="true">
        <svg class="active" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="presentation">
          <g>
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
          </g>
        </svg>
        <svg class="inactive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="presentation">
          <g>
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
          </g>
        </svg>
      </div>
    </a>
  </li>`
}

const renderAltPosts = selector => {
  renderMarkup(selector, createPostMarkup, posts)
}

export default renderAltPosts