import { hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '下划线'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'underline',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      e.preventDefault()

      if (!util.isAvailable($selector, __S_)) return
      document.execCommand('underline')
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

      if (document.queryCommandState('underline')) {
        menu.turnOn()
      } else {
        menu.turnOff()
      }
    }
  })
}

const underline = {
  name: 'underline',
  run: sciprt,
  style: ''
}

export default underline
