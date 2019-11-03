import renderMarkup from './_renderer'
import posts from '../content/posts'

const formatLink = link => {
  /**
   * always make a link look like 'https://google.com'
   * 
   * matches case insensitive:
   * http://google.com
   * https://google.com
   * http://www.google.com
   * https://www.google.com
   * www.google.com
   * //www.google.com
   * //google.com
   * 
   * does not match:
   * google.com
   * wwwgoogle.com
   */
  const protocol = '^(https?:)?\/\/(w{3}\.)?|wWw\./i'
  // const path = '[^:/](\/.*)$' // everything after first slash that is not preceded with / or :
  const path = '.*https:\/\/([^/])*' // everything before first slash that is not the protocol

  link = link.match(protocol) ? link.replace(link.match(protocol)[0], 'https://') : 'https://' + link
  link = link.match(path) ? link.match(path)[0] : link

  return link
} 

const createPostMarkup = post => {
  return `
  <article class="post">
    <a href="${post.link}" title="Explore ${post.title}">
      <h2>${post.title}</h2>
      <p aria-hidden="true" class="subtext">${formatLink(post.link)}</p>
    </a>
    <p>${post.description}</p>
  </article>`
}

const renderPosts = selector => {
  renderMarkup(selector, createPostMarkup, posts)
}

export default renderPosts