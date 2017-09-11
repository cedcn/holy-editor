import $ from 'jquery'
import templete from './templates/menu.pug'

class Menu {
  constructor ({ icon, click, styles }) {
    this.icon = icon
    this.click = click
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

  execute () {
    $('.icon').on('click', this.click)
  }
}

export default Menu
