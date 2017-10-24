import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '中划线'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'strike-through',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()

      if (!util.isAvailable($selector)) return
      document.execCommand('strikeThrough')
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

      if (document.queryCommandState('strikeThrough')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const strikeThrough = {
  name: 'strike-through',
  run: sciprt,
  style: ''
}

export default strikeThrough
