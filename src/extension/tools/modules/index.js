import Modules from './templete'

const name = 'modules'
const sciprt = ({ el, widget, styles }) => {
  const $selector = el.$toolbars.find(styles[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.Menu(menuPoint, {
    icon: 'modules'
  })
}

const modules = {
  name,
  Tpl: Modules,
  run: sciprt
}

export default modules
