import Toolbars from './templete'
import invariant from 'invariant'
import find from 'lodash/find'
import store from '../store'
import styles from '../styles'

const sciprt = ({ options, widget, el }) => {
  options.toolbars.forEach(name => {
    const extension = find(store.tools, item => item.Tpl.title === name)
    invariant(typeof extension !== 'undefined', `Don't discover${name} extension`)
    extension.run({ widget, styles, el })
  })
}

const toolbars = {
  Tpl: Toolbars,
  run: sciprt
}

export default toolbars
