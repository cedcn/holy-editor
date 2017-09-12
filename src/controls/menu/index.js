import templete from './templates/menu.pug'

class Menu {
  constructor ({ icon, styles }) {
    this.icon = icon
    this.styles = styles
  }

  init () {
    this.render()
  }

  render () {
    const locals = {
      icon: this.icon,
      styles: this.styles
    }

    const viewer = templete(locals)

    return viewer
  }
}

export default Menu
