import emojilib from 'emojilib/emojis.json'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

import { hasTagsOrInRange } from 'utils/selection'

import style from './emoji.scss'

const emojiData = groupBy(emojilib, 'category')

/*
  categories:
    people activity symbols objects animals_and_nature flags food_and_drink
*/

const defaults = {
  categories: ['people', 'activity'],
  tooltip: '表情'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

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

  const menu = new widget.Menu($selector, {
    icon: 'emoji',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      panel.toggle()
    }
  })

  const $emojiPanel = $selector.find(__S_['emoji-panel'].selector)

  const $char = $emojiPanel.find(__S_['emoji-char'].selector)

  $char.on('click', function () {
    document.execCommand('insertHTML', false, $(this).text())
    panel.close()
  })

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (hasTagsOrInRange(range, ['PRE'])) {
        util.toDisable(() => menu.disable())
      }
    }
  })
}

const emoji = {
  name: 'emoji',
  run: sciprt,
  style
}

export default emoji
