import $ from 'jquery'
import { element } from 'deku'

import {
  isSelectionInArea,
  getRange,
  hasTagInRange,
  isFullRangeInTag,
  setRange
  // initSelection
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './link.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['link-panel']}>
        <h5>
          输入链接地址(格式：http://...)
        </h5>
        <input class={__S_['link-panel__select']} placeholder="http://... " />
        <input class={__S_['link-panel__url']} placeholder="http://... " />
        <label>打开方式: </label>
        <select>
          <option value="123" >新窗口</option>
          <option value="456" >当前窗口</option>
        </select>
        <a class={__S_['link-panel__submit']} href="javascript:;">确定</a>
      </div>
    )
  })

  const $url = panel.$container.find(__S_['link-panel__url'].selector)
  const $submit = panel.$container.find(__S_['link-panel__submit'].selector)

  const vars = {
    cacheRange: null
  }

  const menu = new widget.Menu($selector, {
    icon: 'link',
    onMouseDown: () => {
      panel.open()
      $url.focus()
    }
  })

  panel.on('open:before', () => {
    vars.cacheRange = getRange()
    $url.val('')
    // 判断cousor 的位置
  })

  panel.on('open:after', () => {
    const range = getRange()
    $url.val('')
    console.log(range)
    // 判断cousor 的位置
  })

  panel.on('close:after', () => {
    $url.val('')
  })

  $submit.on('mousedown', e => {
    e.preventDefault()
    setRange(vars.cacheRange)
    panel.close()
    document.execCommand('insertHTML', false, `<a href="${$url.val()}" target="_blank">link</a>`)
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (isFullRangeInTag(range, 'A')) {
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
  style
}

export default link
