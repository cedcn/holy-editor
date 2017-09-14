import $ from 'jquery'
import Title from './templete'

const name = 'title'
const sciprt = ({ el, widget, styles }) => {
  const selector = el.$toolbars.find(styles[`tool--${name}`].selector).find('#menu-point')
  const selector2 = el.$toolbars.find(styles[`tool--${name}`].selector).find('#modal-point')
  const modal = new widget.Modal(selector2)

  const s = new widget.Menu(selector, {
    icon: 'title',
    click: () => modal.open()
  })
}

const title = {
  name,
  Tpl: Title,
  run: sciprt
}

export default title
