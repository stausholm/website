const themes = {
  purple: {
    '--color-secondary': '#FF4CA8',
    '--color-secondary-light': '#FF4CA8',
    '--color-primary': '#211B3B',
    '--text': '#fff'
  },
  green: {
    '--color-secondary': '#62FED8',
    '--color-secondary-light': '#2a6154',
    '--color-primary': '#0C0C0C',
    '--text': '#fff'
  },
  blue: {
    '--color-secondary': '#3150DF',
    '--color-secondary-light': '#b7c1f5',
    '--color-primary': '#fff',
    '--text': '#3D3C3B'
  },
  red: {
    '--color-secondary': '#F21B5F',
    '--color-secondary-light': '#faafc7',
    '--color-primary': '#FCFCFD',
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
}

export default switchTheme