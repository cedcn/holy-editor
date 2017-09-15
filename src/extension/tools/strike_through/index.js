import $ from 'jquery'

import {
  isContainCurrentSelection
} from 'utils/selection'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')

  new widget.Menu($menuPoint.get(0), {
    icon: 'strike-through',
    onMouseDown: e => {
      e.preventDefault()

      const $menu = $menuPoint.find(__S_['menu'].selector)
      if (!$menu.hasClass(__S_['is-available'].className)) return

      document.execCommand('strikeThrough')

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

    if (document.queryCommandState('strikeThrough')) {
      $menu.addClass(__S_['is-active'].className)
    } else {
      $menu.removeClass(__S_['is-active'].className)
    }
  })
}

const strikeThrough = {
  name: 'strike-through',
  run: sciprt
}

export default strikeThrough
