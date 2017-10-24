import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '无序列表'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'unorder-list',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()
      if (!util.isAvailable($selector, __S_)) return
      document.execCommand('insertUnorderedList')
      el.$document.trigger('selectionchange')
    }
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

      if (document.queryCommandState('insertUnorderedList')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const unorderList = {
  name: 'unorder-list',
  run: sciprt,
  style: ''
}

export default unorderList
