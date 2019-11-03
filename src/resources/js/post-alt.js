import renderMarkup from './_renderer'
import posts from '../content/posts-alt'

const createPostMarkup = post => {
  return `
  <li class="squiggly">
    <a href="${post.link}" title="Explore ${post.title}">
      <span>${post.title}</span>
      <span class="subtext">${post.description}</span>
      <div class="arrow-icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="presentation">
          <g fill="currentColor">
            <g>
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
            </g>
          </g>
        </svg>
      </div>
    </a>
    <svg aria-hidden="true" role="presentation" class="squiggly-line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 50">
      <path fill="none" vector-effect="non-scaling-stroke" d="M0,47.585c0,0,97.5,0,130,0c13.75,0,28.74-38.778,46.168-19.416C192.669,46.5,243.603,47.585,260,47.585c31.821,0,130,0,130,0"/>
    </svg>
  </li>`
}

const renderAltPosts = selector => {
  renderMarkup(selector, createPostMarkup, posts)
}

export default renderAltPosts