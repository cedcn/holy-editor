import $ from 'jquery'
import {
  listenArea
} from 'utils/selection'

import {
  addPoint
} from 'utils/common'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = addPoint($selector)
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  const $modalPoint = addPoint($selector)
  const modal = new widget.Modal($modalPoint.get(0))

  new widget.Menu($menuPoint.get(0), {
    icon: 'image',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable()) {
        return
      }
      modal.open()
    }
  })

  $(document).on('selectionchange', () => {
    if (document.queryCommandState('insertImage')) {
      $selector.addClass(__S_['is-active'].className)
    } else {
      $selector.removeClass(__S_['is-active'].className)
    }
  })

  listenArea($selector, el.$area, __S_)
}

const image = {
  name: 'image',
  run: sciprt,
  style: ''
}

export default image
