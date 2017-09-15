import $ from 'jquery'
import Title from './templete'

const name = 'title'
const sciprt = ({ el, widget, __S_ }) => {
  const $selector = el.$toolbars.find(__S_[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  new widget.DropDownMenu(menuPoint, {
    icon: 'title'
  })
}

const title = {
  name,
  Tpl: Title,
  run: sciprt
}

export default title
