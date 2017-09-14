import $ from 'jquery'
import Italic from './templete'
import {
  isContainsSelection
} from '../../../utils/common'

const name = 'italic'
const sciprt = ({ el, widget, styles }) => {
  const $selector = el.$toolbars.find(styles[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.Menu(menuPoint, {
    icon: 'italic',
    onMouseDown: e => {
      e.preventDefault()

      const $menu = $(menuPoint).find(styles['menu'].selector)
      if (!$menu.hasClass(styles['is-available'].className)) return

      document.execCommand('italic')

      $(document).trigger('selectionchange')
    }
  })

  $(document).on('selectionchange', () => {
    const $menu = $(menuPoint).find(styles['menu'].selector)

    if (isContainsSelection(el.$area)) {
      $menu.addClass(styles['is-available'].className)
    } else {
      $menu.removeClass(styles['is-available'].className)
    }

    if (document.queryCommandState('italic')) {
      $menu.addClass(styles['is-active'].className)
    } else {
      $menu.removeClass(styles['is-active'].className)
    }
  })
}

const italic = {
  name,
  Tpl: Italic,
  run: sciprt
}

export default italic
