import invariant from 'invariant'
import { element } from 'deku'
import find from 'lodash/find'

const Toolbars = {
  render: ({ props }) => {
    const { styles, options, store } = props
    const viewer = options.toolbar.map(name => {
      const tool = find(store.toolbar, item => item.component.title === name)
      invariant(typeof tool !== 'undefined', `没有找到${name}`)

      return tool
    })
    return (
      <div class={styles.toolbars}>{viewer}</div>
    )
  }
}
export default Toolbars
