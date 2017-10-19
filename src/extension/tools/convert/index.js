import { element } from 'deku'
import pangu from 'pangu'
import { toEnable, clickAtOrigin } from 'utils/common'

import style from './convert.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = new widget.Popover($selector, {
    panel: (
      <div class={__S_['convert-panel']}>
        <label><input name="Fruit" type="checkbox" value="" />中英字符间加空格</label>
        <label><input name="Fruit" type="checkbox" value="" />清楚冗余的html代码</label>
        <a class={__S_['convert-panel__submit']} href="javascript:;">确定</a>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'convert',
    onMouseDown: e => {
      panel.togglePanel()
    }
  })

  clickAtOrigin($selector, () => panel.closePanel())
  const $submit = panel.$container.find(__S_['convert-panel__submit'].selector)

  $submit.on('click', () => {
    const newText = pangu.spacing(el.$area.html())
    el.$area.html(newText)
    panel.closePanel()
  })

  toEnable($selector, __S_, () => menu.enable())
}

const convert = {
  name: 'convert',
  run: sciprt,
  style
}

export default convert
