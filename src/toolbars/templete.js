import invariant from 'invariant'
import { element } from 'deku'
import find from 'lodash/find'
import store from '../core/store'

const Toolbars = {
  render: ({ props }) => {
    const { options, widget, __S_ } = props
    const viewer = options.toolbars.map(name => {
      const extension = find(store.tools, item => item.name === name)

      invariant(typeof extension !== 'undefined', `Don't discover ${name} extension templete`)

      return (
        <extension.Tpl __S_={__S_} widget={widget} />
      )
    })

    return (
      <div class={__S_.toolbars}>{viewer}</div>
    )
  }
}
export default Toolbars
