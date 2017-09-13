import Bold from './templete'

const sciprt = ({ $editor, widget, styles }) => {
  const selector = $editor.find(styles[`toolbar--${Bold.title}`].selector)
  const s = new widget.menu.constructor(selector, { styles })
  console.log(s)
}

const bold = {
  Tpl: Bold,
  run: sciprt
}

export default bold
