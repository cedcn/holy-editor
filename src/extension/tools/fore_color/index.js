import $ from 'jquery'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import { element } from 'deku'
import Huebee from 'huebee'
import huebeeCss from 'huebee/huebee.css'

import {
  listenArea
} from 'utils/selection'

import style from './fore-color.scss'

const huebeeStyles = noScope`${huebeeCss}`

insertCss(getCss(huebeeStyles))

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  const dropDown = new widget.DropDownMenu($menuPoint.get(0), {
    icon: 'fore-color',
    menuChildren: (
      <div class={__S_['color-box']} style={'background-color: #000'}></div>
    ),
    panelChildren: (
      <div class="color-input" />
    ),
    onMouseDown: e => {
      e.preventDefault()
      const colorValue = $menuPoint.find(__S_['color-box'].selector).css('background-color')

      if (!isAvailable()) {
        return
      }
      document.execCommand('foreColor', false, colorValue)
      $(document).trigger('selectionchange')
    }
  })

  const $menu = $menuPoint.find('.color-input')
  var hueb = new Huebee($menu.get(0), {
    customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ],
    setText: false,
    setBGColor: false,
    saturations: 2,
    staticOpen: true
  })

  hueb.on('change', (color, hue, sat, lum) => {
    $menuPoint.find(__S_['color-box'].selector).css({
      'background-color': color
    })
    document.execCommand('foreColor', false, color)
    dropDown.togglePanel()
  })

  listenArea($selector, el.$area, __S_)

  $(document).on('selectionchange', () => {
    if (isAvailable()) {
      dropDown.enable()
    } else {
      dropDown.disable()
    }
  })
}

const foreColor = {
  name: 'fore-color',
  run: sciprt,
  style
}

export default foreColor
