function theNet(cssSelector, url) {
  const el = document.querySelector(cssSelector)
  el.style.fontFamily = 'serif'
  el.style.cursor = 'default'
  el.style.textAlign = 'right'
  el.style.padding = '10px'
  el.style.lineHeight = '1'
  el.style.opacity = '0.87'
  el.style.display = 'inline-block'
  el.style.float = 'right'
  el.setAttribute('aria-hidden', true)
  el.textContent = 'Π'
  el.title = 'so, what do you make of all this?'
  el.addEventListener('click', e => {
    if (e.ctrlKey && e.shiftKey) {
      window.location = url
    }
  })
}

export default theNet