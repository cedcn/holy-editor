import Menu from '../../controls/menu'

class Title {
  name = 'title'

  constructor ({ styles }) {
    this.styles = styles
    this._init()
  }

  _init () {
    this.btn = new Menu({
      icon: 'size',
      styles: this.styles,
      click: e => {
        console.log(12)
      }
    })
  }

  render () {
    return this.btn.render()
  }

  execute () {
    this.btn.execute()
  }
}

export default Title
