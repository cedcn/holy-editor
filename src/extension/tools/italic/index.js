import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '斜体'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'italic',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()

      if (!util.isAvailable($selector)) return
      document.execCommand('italic')
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

      if (document.queryCommandState('italic')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const italic = {
  name: 'italic',
  run: sciprt,
  style: ''
}

export default italic
