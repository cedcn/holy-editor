class Bold {
  name = 'bold'

  constructor ({ styles, controls }) {
    this.styles = styles
    this.controls = controls
    this.init()
  }

  init () {
    this.btn = new this.controls.Menu({
      icon: 'bold',
      styles: this.styles
    })
  }

  render () {
    return this.btn.render()
  }
}

export default Bold
