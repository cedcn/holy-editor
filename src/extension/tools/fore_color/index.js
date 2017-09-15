import $ from 'jquery'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import { element } from 'deku'
import Huebee from 'huebee'
import huebeeCss from 'huebee/huebee.css'

import ForeColor from './templete'

import {
  isContainCurrentSelection
} from 'utils/selection'

const huebeeStyles = noScope`${huebeeCss}`

insertCss(getCss(huebeeStyles))

const name = 'fore-color'
const sciprt = ({ el, widget, __S_ }) => {
  const $selector = el.$toolbars.find(__S_[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)

  const s = new widget.DropDownMenu(menuPoint, {
    icon: 'fore-color',
    menuChildren: (
      <div class={__S_['fore-color-box']} style={'background-color: #000'}></div>
    ),
    panelChildren: (
      <div class="color-input" />
    ),
    onMouseDown: e => {
      e.preventDefault()
      const $menu = $(menuPoint).find(__S_['menu'].selector)
      const colorValue = $(menuPoint).find(__S_['fore-color-box'].selector).css('background-color')

      if (!$menu.hasClass(__S_['is-available'].className)) return

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
    $(menuPoint).find(__S_['fore-color-box'].selector).css({
      'background-color': color
    })
    document.execCommand('foreColor', false, color)
    s.togglePanel()
  })

  $(document).on('selectionchange', () => {
    const $menu = $(menuPoint).find(__S_['menu'].selector)

    if (isContainCurrentSelection(el.$area)) {
      $menu.addClass(__S_['is-available'].className)
    } else {
      $menu.removeClass(__S_['is-available'].className)
    }
  })
}

const foreColor = {
  name,
  Tpl: ForeColor,
  run: sciprt
}

export default foreColor
