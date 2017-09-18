import $ from 'jquery'
import {
  listenArea
} from 'utils/selection'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  new widget.Menu($menuPoint.get(0), {
    icon: 'italic',
    onMouseDown: e => {
      e.preventDefault()

      if (!isAvailable()) return
      document.execCommand('italic')
      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    if (document.queryCommandState('italic')) {
      $selector.addClass(__S_['is-active'].className)
    } else {
      $selector.removeClass(__S_['is-active'].className)
    }
  })

  listenArea($selector, el.$area, __S_)
}

const italic = {
  name: 'italic',
  run: sciprt,
  style: ''
}

export default italic
