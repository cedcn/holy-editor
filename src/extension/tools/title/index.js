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

import style from './title.scss'
const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const menu = new widget.SelectMenu($selector, {
    options: [{
      label: 'P',
      value: 'P'
    }, {
      label: 'H1',
      value: 'H1'
    }, {
      label: 'H2',
      value: 'H2'
    }, {
      label: 'H3',
      value: 'H3'
    }, {
      label: 'H4',
      value: 'H4'
    }, {
      label: 'H5',
      value: 'H5'
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

const title = {
  name: 'title',
  run: sciprt,
  style
}

export default title
