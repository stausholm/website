export default function Toasts() {
  this.toastsContainer = undefined

  const init = () => {
    if (document.body.classList.contains('toasties')) {
      this.toastsContainer = document.querySelector('.toasts')
    } else {
      document.body.classList.add('toasties')
      const toastsContainer = document.createElement('div')
      toastsContainer.classList.add('toasts')
      document.body.appendChild(toastsContainer)
      this.toastsContainer = toastsContainer
    }
  }

  this.create = (text, timeout) => {
    const toast = document.createElement('div')
    toast.classList.add('toast')
    toast.textContent = text

    let timer
    if (timeout) {
      timer = setTimeout(() => {
        toast.click()
      }, timeout)
    }

    toast.onclick = function() {
      toast.classList.add('leaving')
      if (timeout)
        clearTimeout(timer)
    }
    
    toast.addEventListener('transitionend', (e) => {
      if (toast.classList.contains('leaving')) {
        if (e.propertyName === 'transform')
          toast.parentNode.removeChild(toast)
      }
    })
    
    const close = document.createElement('i')
    close.classList.add('close')
    close.innerHTML = '&times;'
    close.setAttribute('aria-label', 'Clear notification')
    toast.appendChild(close)

    return toast
  }

  this.add = (text, timeout) => {
    this.toastsContainer.appendChild(this.create(text, timeout))
  }

  init()
}
