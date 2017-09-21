import $ from 'jquery'
import style from './bold.scss'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  addPoint,
  isInRange,
  toEnable,
  toDisable
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $point = addPoint($selector)

  const menu = new widget.Menu($point.get(0), {
    icon: 'bold',
    onMouseDown: e => {
      document.execCommand('bold')
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

      if (document.queryCommandState('bold')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const bold = {
  name: 'bold',
  run: sciprt,
  style
}

export default bold
