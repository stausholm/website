import renderMarkup from './_renderer'
import links from '../content/links'

const createFooterMarkup = link => {
  return `
  <a href="${link.url}" class="footer-link" title="${link.title}">
    <svg class="circle-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <g fill="none" stroke-linejoin="round" stroke-miterlimit="10">
        <circle class="circle-icon--circle-bg" cx="16" cy="16" r="15.12"></circle>
        <circle class="circle-icon--circle-bg-2" cx="16" cy="16" r="15.12"></circle>
        <circle class="circle-icon--circle" cx="16" cy="16" r="15.12"></circle>
      </g>
    </svg>
    <div class="icon">
      ${link.icon}
    </div>
  </a>`
}

const renderFooter = selector => {
  renderMarkup(selector, createFooterMarkup, links)
}

export default renderFooter