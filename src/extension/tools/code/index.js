import $ from 'jquery'
import {
  listenArea
} from 'utils/selection'

import {
  addPoint
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $point = addPoint($selector)
  const menu = new widget.SelectMenu($point.get(0), {
    options: [{
      label: 'code',
      value: ''
    }, {
      label: 'javascript',
      value: 'javascript'
    }, {
      label: 'ruby',
      value: 'ruby'
    }]
  })

  listenArea($selector, el.$area, __S_)
}

const code = {
  name: 'code',
  run: sciprt,
  style: ''
}

export default code
