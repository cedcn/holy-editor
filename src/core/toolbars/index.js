import Toolbars from './templete'
import invariant from 'invariant'
import find from 'lodash/find'
import store from '../store'

const sciprt = ({ options, widget, el, __S_ }) => {
  options.toolbars.forEach(name => {
    const extension = find(store.tools, item => item.name === name)

    invariant(typeof extension !== 'undefined', `Don't discover ${name} tools sciprt!`)
    extension.run({ widget, __S_, el })
  })
}

const toolbars = {
  Tpl: Toolbars,
  run: sciprt
}

export default toolbars
