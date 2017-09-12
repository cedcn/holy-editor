import Menu from '../../../controls/menu'

class Title {
  name = 'title'

  constructor ({ styles }) {
    this.styles = styles
    this.init()
  }

  init () {
    this.btn = new Menu({
      icon: 'size',
      styles: this.styles
    })
  }

  render () {
    return this.btn.render()
  }
}

export default Title
