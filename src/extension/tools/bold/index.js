import $ from 'jquery'
import Bold from './templete'
import {
  isContainCurrentSelection
} from 'utils/selection'

const name = 'bold'
const sciprt = ({ el, widget, __S_ }) => {
  const $selector = el.$toolbars.find(__S_[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.Menu(menuPoint, {
    icon: 'bold',
    onMouseDown: e => {
      e.preventDefault()

      const $menu = $(menuPoint).find(__S_['menu'].selector)
      if (!$menu.hasClass(__S_['is-available'].className)) return

      document.execCommand('bold')

      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    const $menu = $(menuPoint).find(__S_['menu'].selector)

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
  name,
  Tpl: Bold,
  run: sciprt
}

export default bold
