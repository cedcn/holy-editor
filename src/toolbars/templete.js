import invariant from 'invariant'
import { element } from 'deku'
import find from 'lodash/find'
import store from '../store'
import styles from '../styles'

const Toolbars = {
  render: ({ props }) => {
    const { options, widget } = props
    const viewer = options.toolbars.map(name => {
      const extension = find(store.tools, item => item.name === name)

      invariant(typeof extension !== 'undefined', `Don't discover ${name} extension templete`)

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
