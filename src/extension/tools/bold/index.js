import Bold from './templete'

const name = 'bold'
const sciprt = ({ el, widget, styles }) => {
  const selector = el.$toolbars.find(styles[`tool--${name}`].selector).find('#menu-point')

  const s = new widget.Menu(selector, { icon: 'bold' })
}

const bold = {
  name,
  Tpl: Bold,
  run: sciprt
}

export default bold
