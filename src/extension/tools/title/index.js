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
      label: '正文',
      value: 'P'
    }, {
      label: '标题一',
      value: 'H2'
    }, {
      label: '标题二',
      value: 'H3'
    }, {
      label: '标题三',
      value: 'H4'
    }, {
      label: '备注',
      value: 'ASIDE'
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

      if (isFullRangeInTag(range, 'H2')) {
        menu.turnOn()
        menu.setChecked({ value: 'H2', label: '标题一' })
      } else if (isFullRangeInTag(range, 'H3')) {
        menu.turnOn()
        menu.setChecked({ value: 'H3', label: '标题二' })
      } else if (isFullRangeInTag(range, 'H4')) {
        menu.turnOn()
        menu.setChecked({ value: 'H4', label: '标题三' })
      } else if (isFullRangeInTag(range, 'ASIDE')) {
        menu.turnOn()
        menu.setChecked({ value: 'ASIDE', label: '备注' })
      } else if (isFullRangeInTag(range, 'P')) {
        menu.turnOn()
        menu.setChecked({ value: 'P', label: '正文' })
      } else {
        menu.turnOff()
        menu.setChecked({ value: 'P', label: '正文' })
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
