import $ from 'jquery'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  isInRange,
  toEnable,
  toDisable
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const menu = new widget.Menu($selector, {
    icon: 'justify-right',
    onMouseDown: e => {
      document.execCommand('justifyRight')
      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (document.queryCommandState('justifyRight')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const justifyRight = {
  name: 'justify-right',
  run: sciprt,
  style: ''
}

export default justifyRight
