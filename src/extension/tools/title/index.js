import $ from 'jquery'
import Title from './templete'

const name = 'title'
const sciprt = ({ el, widget, styles }) => {
  const $selector = el.$toolbars.find(styles[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.DropDownMenu(menuPoint, {
    icon: 'title'
  })
}

const title = {
  name,
  Tpl: Title,
  run: sciprt
}

export default title
