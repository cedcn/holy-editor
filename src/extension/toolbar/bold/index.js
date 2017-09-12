import Menu from '../../../controls/menu'

class Bold {
  name = 'bold'

  constructor ({ styles }) {
    this.styles = styles
    this.init()
  }

  init () {
    this.btn = new Menu({
      icon: 'bold',
      styles: this.styles
    })
  }

  render () {
    return this.btn.render()
  }
}

export default Bold
