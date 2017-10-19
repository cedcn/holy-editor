import $ from 'jquery'
import { element } from 'deku'

import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './font_size.scss'
const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const menu = new widget.SelectMenu($selector, {
    options: [{
      label: '10',
      value: '10'
    }, {
      label: '12',
      value: '12'
    }, {
      label: '14',
      value: '14'
    }, {
      label: '16',
      value: '16'
    }],
    onSelect: checked => {
      document.execCommand('formatBlock', false, checked.value)
      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => {
        menu.enable()
      })

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => {
          menu.disable()
        })
      }
    } else {
      toDisable($selector, __S_, () => {
        menu.disable()
      })
    }
  })
}

const fontSize = {
  name: 'font-size',
  run: sciprt,
  style
}

export default fontSize
