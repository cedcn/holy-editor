import $ from 'jquery'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import { element } from 'deku'
import Huebee from 'huebee'
import huebeeCss from 'huebee/huebee.css'

import ForeColor from './templete'

import {
  isContainsSelection
} from '../../../utils/common'

const huebeeStyles = noScope`${huebeeCss}`

insertCss(getCss(huebeeStyles))

const name = 'fore-color'
const sciprt = ({ el, widget, styles }) => {
  const $selector = el.$toolbars.find(styles[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.DropDownMenu(menuPoint, {
    icon: 'fore-color',
    menuChildren: (
      <div class={styles['fore-color-box']} style={'background-color: #000'}></div>
    ),
    panelChildren: (
      <div class="color-input" />
    ),
    onMouseDown: e => {
      e.preventDefault()
      const $menu = $(menuPoint).find(styles['menu'].selector)
      const colorValue = $(menuPoint).find(styles['fore-color-box'].selector).css('background-color')

      if (!$menu.hasClass(styles['is-available'].className)) return

      document.execCommand('foreColor', false, colorValue)

      $(document).trigger('selectionchange')
    }
  })

  const ss = $(menuPoint).find('.color-input').get(0)
  var hueb = new Huebee(ss, {
    customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ],
    setText: false,
    setBGColor: false,
    saturations: 2,
    staticOpen: true
  })

  hueb.on('change', (color, hue, sat, lum) => {
    $(menuPoint).find(styles['fore-color-box'].selector).css({
      'background-color': color
    })
    document.execCommand('foreColor', false, color)
    s.togglePanel()
  })

  $(document).on('selectionchange', () => {
    const $menu = $(menuPoint).find(styles['menu'].selector)

    if (isContainsSelection(el.$area)) {
      $menu.addClass(styles['is-available'].className)
    } else {
      $menu.removeClass(styles['is-available'].className)
    }
  })
}

const foreColor = {
  name,
  Tpl: ForeColor,
  run: sciprt
}

export default foreColor
