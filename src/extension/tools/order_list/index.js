import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '有序列表'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'order-list',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()
      if (!util.isAvailable($selector)) return
      document.execCommand('insertOrderedList')
      $(document).trigger('selectionchange')
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

      if (document.queryCommandState('insertOrderedList')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const orderList = {
  name: 'order-list',
  run: sciprt,
  style: ''
}

export default orderList
