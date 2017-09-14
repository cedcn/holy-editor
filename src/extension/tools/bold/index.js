import Bold from './templete'

const sciprt = ({ el, widget, styles }) => {
  const selector = el.$toolbars.find(styles[`toolbar--${Bold.title}`].selector)
  const s = new widget.menu.constructor(selector)
}

const bold = {
  Tpl: Bold,
  run: sciprt
}

export default bold
