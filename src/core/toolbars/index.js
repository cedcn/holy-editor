import Toolbars from './templete'
import { toCamelCase } from 'utils/common'

const sciprt = ({ tools, options, widget, el, __S_ }) => {
  console.log(options)

  tools.forEach(item => {
    const $selector = el.$toolbars.find(`#${__S_[`tool--${item.name}`].className}`)
    item.run(options.tools[toCamelCase(item.name)])({ widget, __S_, el, $selector })
  })
}

const toolbars = {
  Tpl: Toolbars,
  run: sciprt
}

export default toolbars
