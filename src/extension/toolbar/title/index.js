class Title {
  name = 'title'

  constructor ({ styles, controls }) {
    this.styles = styles
    this.controls = controls
    this.init()
  }

  init () {
    this.btn = new this.controls.Menu({
      icon: 'size',
      styles: this.styles
    })
  }

  render () {
    return this.btn.render()
  }
}

export default Title
