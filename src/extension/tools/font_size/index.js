import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable,
  computedFontSize
} from 'utils/common'

import style from './font_size.scss'

const defaults = {
  tooltip: '文本尺寸'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.SelectMenu($selector, {
    options: [{
      label: '10',
      value: '1'
    }, {
      label: '13',
      value: '2'
    }, {
      label: '16',
      value: '3'
    }, {
      label: '18',
      value: '4'
    }, {
      label: '24',
      value: '5'
    }, {
      label: '32',
      value: '6'
    }],
    tooltip: opts.tooltip,
    onSelect: checked => {
      document.execCommand('fontSize', false, checked.value)
      // $(document).trigger('selectionchange')
    }
  })

  el.$document.on('selectionchange', () => {
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
      const snode = range.startContainer
      const size = computedFontSize(snode.parentNode)

      if (size === 10) {
        menu.turnOn()
        menu.setChecked({ value: '1', label: '10' })
      } else if (size === 13) {
        menu.turnOn()
        menu.setChecked({ value: '2', label: '13' })
      } else if (size === 16) {
        menu.turnOn()
        menu.setChecked({ value: '3', label: '16' })
      } else if (size === 18) {
        menu.turnOn()
        menu.setChecked({ value: '4', label: '18' })
      } else if (size === 24) {
        menu.turnOn()
        menu.setChecked({ value: '5', label: '24' })
      } else if (size === 32) {
        menu.turnOn()
        menu.setChecked({ value: '6', label: '32' })
      } else {
        menu.turnOff()
        menu.setChecked({ value: '', label: '' })
      }
    } else {
      toDisable($selector, __S_, () => {
        menu.disable()
      })
    }
  })
}

const fontSize = {
  name: 'font-size',
  run: sciprt,
  style
}

export default fontSize