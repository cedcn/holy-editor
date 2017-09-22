import $ from 'jquery'
import emojilib from 'emojilib/emojis.json'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import { element } from 'deku'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  isInRange,
  toEnable,
  toDisable,
  clickAtOrigin
} from 'utils/common'


const emojiList = map(groupBy(emojilib, 'category'), (item, key) => {
  const chars = map(item, category => category.char)
  return { [key]: chars }
})

// console.log(emojiList)

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const menu = new widget.Menu($selector, {
    icon: 'emoji',
    onMouseDown: e => {
      e.preventDefault()
      panel.togglePanel()
    }
  })

  const panel = new widget.Popover($selector, {
    panel: <div>123123</div>
  })

  clickAtOrigin($selector, () => panel.closePanel())

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (document.queryCommandState('italic')) {
        $selector.addClass(__S_['is-active'].className)
      } else {
        $selector.removeClass(__S_['is-active'].className)
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const emoji = {
  name: 'emoji',
  run: sciprt,
  style: ''
}

export default emoji
