import $ from 'jquery'
import Italic from './templete'
import {
  isContainsSelection
} from '../../../utils/common'

const name = 'italic'
const sciprt = ({ el, widget, __S_ }) => {
  const $selector = el.$toolbars.find(__S_[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.Menu(menuPoint, {
    icon: 'italic',
    onMouseDown: e => {
      e.preventDefault()

      const $menu = $(menuPoint).find(__S_['menu'].selector)
      if (!$menu.hasClass(__S_['is-available'].className)) return

      document.execCommand('italic')

      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    const $menu = $(menuPoint).find(__S_['menu'].selector)

    if (isContainsSelection(el.$area)) {
      $menu.addClass(__S_['is-available'].className)
    } else {
      $menu.removeClass(__S_['is-available'].className)
    }

    if (document.queryCommandState('italic')) {
      $menu.addClass(__S_['is-active'].className)
    } else {
      $menu.removeClass(__S_['is-active'].className)
    }
  })
}

const italic = {
  name,
  Tpl: Italic,
  run: sciprt
}

export default italic
