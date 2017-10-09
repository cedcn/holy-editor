import $ from 'jquery'
import { element } from 'deku'

import {
  isSelectionInArea,
  getRange
  // initSelection
} from 'utils/selection'

import {
  isInRange,
  isFullInRange,
  toEnable,
  toDisable,
  clickAtOrigin
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = new widget.Modal($selector, {
    panel: (
      <div>
        <div class="asd">
          输入链接地址(格式：http://...)
        </div>
        <input placeholder="http://... " />
        <label>打开方式: </label>
        <select>
          <option value="123" />
          <option value="456" />
        </select>
        <a href="javascript:;">确定</a>
      </div>
    )
  })

  const $input = panel.$container.find('input')
  const $button = panel.$container.find('a')

  let cacheRange = null
  const menu = new widget.Menu($selector, {
    icon: 'link',
    onMouseDown: e => {
      const selection = window.getSelection()
      panel.open()
      cacheRange = selection.getRangeAt(0)
      $input.focus()
    }
  })

  $input.on('mousedown', e => {
    e.stopPropagation()
  })

  $button.on('mousedown', e => {
    e.preventDefault()
    e.stopPropagation()

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(cacheRange)
    panel.close()
    document.execCommand('insertHTML', false, `<a href=${$input.val()} target="_blank">link</a>`)
  })

  clickAtOrigin($selector, () => panel.close())

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (isFullInRange(range, 'A')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const link = {
  name: 'link',
  run: sciprt,
  style: ''
}

export default link
