import invariant from 'invariant'
import { element } from 'deku'
import find from 'lodash/find'
import store from '../store'
import styles from '../styles'

const Toolbars = {
  render: ({ props }) => {
    const { options, widget } = props
    const viewer = options.toolbar.map(name => {
      const extension = find(store.toolbar, item => item.Tpl.title === name)
      invariant(typeof extension !== 'undefined', `Don't discover${name} extension`)

      return (
        <extension.Tpl styles={styles} widget={widget} />
      )
    })

    return (
      <div class={styles.toolbars}>{viewer}</div>
    )
  }
}
export default Toolbars
