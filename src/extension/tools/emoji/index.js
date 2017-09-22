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

import style from './emoji.scss'

const emojiData = groupBy(emojilib, 'category')

const defaults = {
  categories: ['people', 'activity', 'symbols', 'objects', 'animals_and_nature', 'flags', 'food_and_drink']
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.Menu($selector, {
    icon: 'emoji',
    onMouseDown: e => {
      e.preventDefault()
      panel.togglePanel()
    }
  })

  const emojiList = map(opts.categories, key => {
    const categoryEmoji = map(emojiData[key], item => {
      return <span class={__S_['emoji-char']}>{item.char}</span>
    })
    return (
      <div class={__S_['emoji-item']}>
        <div class={__S_['emoji-item-title']}>
          {key}
        </div>
        <div class={__S_['emoji-item-content']}>
          {categoryEmoji}
        </div>
      </div>
    )
  })

  const panel = new widget.Popover($selector, {
    panel: (
      <div class={__S_['emoji-panel']}>
        <div class={__S_['emoji-list']}>{emojiList}</div>
      </div>
    )
  })

  const $emojiPanel = $selector.find(__S_['emoji-panel'].selector)

  const $char = $emojiPanel.find(__S_['emoji-char'].selector)

  $char.on('click', function () {
    document.execCommand('insertHTML', false, $(this).text())
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
  style
}

export default emoji