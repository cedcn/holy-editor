import $ from 'jquery'
import Menu from './templete'
import styles from '../../styles'

const defaults = {
  click: () => {}
}
class Widget {
  constructor (selector, options) {
    this.options = Object.assign({}, defaults, options)
    $(selector).on('click', this.options.click)
  }
}

const menu = {
  Tpl: Menu,
  constructor: Widget
}

export default menu
