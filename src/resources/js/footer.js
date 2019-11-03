import renderMarkup from './_renderer'
import links from '../content/links'

const createFooterMarkup = link => {
  return `
  <div class="col col-25 col-s-100">
    <a href="${link.url}" class="footer-link" title="${link.title}">
      <span class="shadow"></span>
      <span>${link.title}</span>
      <div class="icon">
        ${link.icon}
      </div>
    </a>
  </div>`
}

const renderFooter = selector => {
  renderMarkup(selector, createFooterMarkup, links)
}

export default renderFooter