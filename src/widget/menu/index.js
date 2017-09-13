import $ from 'jquery'
import Menu from './templete'

class Widget {
  constructor (selector, { styles }) {
    this.styles = styles
    console.log(123)
    $(selector).on('click', () => {
      console.log(123)
    })
  }
}

const menu = {
  Tpl: Menu,
  constructor: Widget
}

export default menu
