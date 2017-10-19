import $ from 'jquery'
import { element } from 'deku'

import { toEnable, toDisable } from 'utils/common'
import style from './iframe.scss'

import { getRange, setSelection, isSelectionInArea, hasTagInRange } from 'utils/selection'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['iframe-panel']}>
        <div class={`${__S_['iframe-panel__url-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>iframe url</h5>
          <input class={__S_['iframe-panel__url']} placeholder="Link Text" />
        </div>
        <div class={`${__S_['iframe-panel__width-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>宽度</h5>
          <input class={__S_['iframe-panel__width']} placeholder="http://... " />
        </div>
        <div class={`${__S_['iframe-panel__height-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>高度</h5>
          <input class={__S_['iframe-panel__height']} placeholder="http://... " />
        </div>
        <div class={`${__S_['iframe-panel__submit-wrap']} ${__S_['iframe-panel__filed']}`}>
          <a class={__S_['iframe-panel__submit']} href="javascript:;">确定</a>
        </div>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'iframe',
    onMouseDown: e => {
      panel.open()
    }
  })

  const vars = {
    cacheRange: null
  }

  panel.on('open:before', () => {
    const range = getRange()
    if (range === null) return
    vars.cacheRange = range
  })

  panel.on('close:before', () => {
    setSelection(vars.cacheRange)
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())
      const range = getRange()

      if (hasTagInRange(range, 'PRE') || hasTagInRange(range, 'BLOCKQUOTE')) {
        toDisable($selector, __S_, () => menu.disable())
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const iframe = {
  name: 'iframe',
  run: sciprt,
  style
}

export default iframe
