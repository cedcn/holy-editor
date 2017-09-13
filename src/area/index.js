class Area {
  constructor ({ styles }) {
    this.styles = styles
  }

  init () {

  }

  render () {
    const viewer = `<div id="${this.styles.area}" class="${this.styles.area}" contenteditable="true"></div>`

    return viewer
  }

  execute () {
  }
}

export default Area
