import {
  isSelectionInArea,
  hasTagInRange,
  getRange,
  isFullRangeInTag
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './title.scss'

const defaults = {
  tooltip: '标题'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.SelectMenu($selector, {
    options: [{
      label: 'P',
      value: 'P'
    }, {
      label: 'H1',
      value: 'H1'
    }, {
      label: 'H2',
      value: 'H2'
    }, {
      label: 'H3',
      value: 'H3'
    }, {
      label: 'H4',
      value: 'H4'
    }, {
      label: 'H5',
      value: 'H5'
    }],
    tooltip: opts.tooltip,
    onSelect: checked => {
      document.execCommand('formatBlock', false, checked.value)
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

      if (isFullRangeInTag(range, 'H1')) {
        menu.turnOn()
        menu.setChecked({ value: 'H1', label: 'H1' })
      } else if (isFullRangeInTag(range, 'H2')) {
        menu.turnOn()
        menu.setChecked({ value: 'H2', label: 'H2' })
      } else if (isFullRangeInTag(range, 'H3')) {
        menu.turnOn()
        menu.setChecked({ value: 'H3', label: 'H3' })
      } else if (isFullRangeInTag(range, 'H4')) {
        menu.turnOn()
        menu.setChecked({ value: 'H4', label: 'H4' })
      } else if (isFullRangeInTag(range, 'H5')) {
        menu.turnOn()
        menu.setChecked({ value: 'H5', label: 'H5' })
      } else if (isFullRangeInTag(range, 'P')) {
        menu.turnOn()
        menu.setChecked({ value: 'P', label: 'P' })
      } else {
        menu.turnOff()
        menu.setChecked({ value: 'P', label: 'P' })
      }
    } else {
      toDisable($selector, __S_, () => {
        menu.disable()
      })
    }
  })
}

const title = {
  name: 'title',
  run: sciprt,
  style
}

export default title
