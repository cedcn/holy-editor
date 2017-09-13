import Toolbars from './templete'
import invariant from 'invariant'
import find from 'lodash/find'

const sciprt = ({ styles, options, store, widget, $editor }) => {
  options.toolbar.forEach(name => {
    const extension = find(store.toolbar, item => item.Tpl.title === name)
    invariant(typeof extension !== 'undefined', `Don't discover${name} extension`)
    extension.run({ widget, styles, $editor })
  })
}

const toolbars = {
  Tpl: Toolbars,
  run: sciprt
}

export default toolbars
