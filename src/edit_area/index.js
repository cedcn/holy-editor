class EditArea {
  constructor ({ styles }) {
    this.styles = styles
  }

  init () {

  }

  render () {
    const viewer = `<div id="${this.styles['edit-area']}" class="${this.styles['edit-area']}" contenteditable="true"></div>`

    return viewer
  }

  execute () {
  }
}

export default EditArea
