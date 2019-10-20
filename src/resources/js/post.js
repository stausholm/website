import posts from '../content/posts'

const formatLink = path => {
  // only interested in protocol & hostname
  return 'TODO'+path
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