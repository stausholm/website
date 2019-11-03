const renderMarkup = (selector, templateFunc, data) => {
  const el = document.querySelector(selector)
  if (!el) return

  return el.innerHTML = generateMarkup(templateFunc, data)
}

const generateMarkup = (templateFunc, data) => {
  let markup = ''

  data.forEach(item => {
    markup += templateFunc(item) 
  });
  return markup
}

export default renderMarkup