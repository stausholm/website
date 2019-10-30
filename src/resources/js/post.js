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
    <h2><a href="${post.link}">${post.title}</a></h2>
    <p><a href="${post.link}">${formatLink(post.link)}</a></p>
    <p>${post.description}</p>
  </article>`
}

const generatePosts = posts => {
  let markup = ''

  posts.forEach(post => {
    markup += createPostMarkup(post) 
  });
  return markup
  //return posts.map(createPostMarkup).
}

const renderPosts = selector => {
  const el = document.querySelector(selector)
  if (!el) return

  return el.innerHTML = generatePosts(posts)
}

module.exports = renderPosts