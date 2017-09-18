import $ from 'jquery'

import {
  listenArea
} from 'utils/selection'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  new widget.Menu($menuPoint.get(0), {
    icon: 'order-list',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable()) return
      document.execCommand('insertOrderedList')
      $(document).trigger('selectionchange')
    }
  })

  listenArea($selector, el.$area, __S_)

  $(document).on('selectionchange', () => {
    if (document.queryCommandState('insertOrderedList')) {
      $selector.addClass(__S_['is-active'].className)
    } else {
      $selector.removeClass(__S_['is-active'].className)
    }
  })
}

const orderList = {
  name: 'order-list',
  run: sciprt,
  style: ''
}

export default orderList
