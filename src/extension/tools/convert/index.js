import { element } from 'deku'
import pangu from 'pangu'
import { toEnable } from 'utils/common'

import style from './convert.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const dropDown = new widget.DropDownMenu($selector, {
    icon: 'convert',
    panelChildren: (
      <div class={__S_['convert-panel']}>
        <label><input name="Fruit" type="checkbox" value="" />中英字符间加空格</label>
        <a class={__S_['convert-panel__submit']} href="javascript:;">确定</a>
      </div>
    ),
    onMouseDown: e => {
      e.preventDefault()
    }
  })

  const $submit = dropDown.$container.find(__S_['convert-panel__submit'].selector)

  $submit.on('click', () => {
    const newText = pangu.spacing(el.$area.html())
    el.$area.html(newText)
    dropDown.closePanel()
  })

  toEnable($selector, __S_, () => dropDown.enable())
}

const convert = {
  name: 'convert',
  run: sciprt,
  style
}

export default convert
