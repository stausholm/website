const themes = {
  purple: {
    '--color-secondary': '#FF4CA8',
    '--color-secondary--rgb': '255, 76, 168',
    '--color-secondary-light': '#FF4CA8',
    '--color-primary': '#211B3B',
    '--color-primary--rgb': '33, 27, 59',
    '--text': '#fff'
  },
  green: {
    '--color-secondary': '#62FED8',
    '--color-secondary--rgb': '98, 254, 216',
    '--color-secondary-light': '#2a6154',
    '--color-primary': '#0C0C0C',
    '--color-primary--rgb': '12, 12, 12',
    '--text': '#fff'
  },
  blue: {
    '--color-secondary': '#3150DF',
    '--color-secondary--rgb': '49, 80, 223',
    '--color-secondary-light': '#b7c1f5',
    '--color-primary': '#fff',
    '--color-primary--rgb': '255, 255, 255',
    '--text': '#3D3C3B'
  },
  red: {
    '--color-secondary': '#F21B5F',
    '--color-secondary--rgb': '242, 27, 95',
    '--color-secondary-light': '#faafc7',
    '--color-primary': '#FCFCFD',
    '--color-primary--rgb': '252, 252, 253',
    '--text': '#282066'
  }
}

const switchTheme = (key) => {
  const theme = themes[key]
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  metaThemeColor.setAttribute('content', theme['--color-secondary'])

  Object.keys(theme).forEach(cssVar => {
    document.documentElement.style.setProperty(cssVar, theme[cssVar])
  })

  Object.keys(themes).forEach(themeKey => {
    document.body.classList.remove(`theme-${themeKey}`)
  })
  document.body.classList.add(`theme-${key}`)

  window.dispatchEvent(new CustomEvent('switchTheme'))
}

const supportsCssVariables = () => {
  return window.CSS && CSS.supports('color', 'var(--primary)')
}

export default switchTheme