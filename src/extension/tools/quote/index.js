import {
  hasTagsOrInRange,
  isFullRangeInTag,
  getRange,
  nodeInTag
} from 'utils/selection'

const defaults = {
  tooltip: '引用'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'quote',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      const range = getRange()

      if (isFullRangeInTag(range, 'BLOCKQUOTE')) {
        document.execCommand('formatBlock', false, 'P')
      } else {
        document.execCommand('formatBlock', false, 'BLOCKQUOTE')
      }
      el.$document.trigger('selectionchange')
    }
  })

  el.$area.on('mousedown', e => {
    const $blockquote = el.$area.find('blockquote')

    $blockquote.each((index, item) => {
      const $item = $(item)
      if (e.pageY > $item.offset().top + $item.innerHeight()) {
        let $elem = null
        const func = ($item, $area) => {
          if ($item.parent().get(0) === $area.get(0)) {
            $elem = $item
          } else {
            func($item.parent(), $area)
          }
        }

        func($item, el.$area)

        if ($elem.next().length === 0) {
          el.$area.append('<p><br /></p>')
        }
      }
    })
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

      if (isFullRangeInTag(range, 'BLOCKQUOTE')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const quote = {
  name: 'quote',
  run: sciprt,
  style: ''
}

export default quote
