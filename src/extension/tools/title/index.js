import {
  hasTagsOrInRange,
  isFullRangeInTag
} from 'utils/selection'

import style from './title.scss'

const defaults = {
  tooltip: '标题'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
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
    }
  })
}

const title = {
  name: 'title',
  run: sciprt,
  style
}

export default title
