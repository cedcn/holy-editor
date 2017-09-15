import $ from 'jquery'
import style from './bold.scss'

import {
  isContainCurrentSelection
} from 'utils/selection'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')

  new widget.Menu($menuPoint.get(0), {
    icon: 'bold',
    onMouseDown: e => {
      e.preventDefault()

      const $menu = $menuPoint.find(__S_['menu'].selector)
      if (!$menu.hasClass(__S_['is-available'].className)) return

      document.execCommand('bold')

      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    const $menu = $menuPoint.find(__S_['menu'].selector)

    if (isContainCurrentSelection(el.$area)) {
      $menu.addClass(__S_['is-available'].className)
    } else {
      $menu.removeClass(__S_['is-available'].className)
    }

    if (document.queryCommandState('bold')) {
      $menu.addClass(__S_['is-active'].className)
    } else {
      $menu.removeClass(__S_['is-active'].className)
    }
  })
}

const bold = {
  name: 'bold',
  run: sciprt,
  style
}

export default bold
