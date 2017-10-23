import $ from 'jquery'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import Huebee from 'huebee'
import huebeeCss from './huebee.scss'

import {
  isSelectionInArea,
  hasTagInRange,
  getRange
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './fore-color.scss'

const huebeeStyles = noScope`${huebeeCss}`

insertCss(getCss(huebeeStyles))

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  const dropDown = new widget.DropDownMenu($selector, {
    icon: 'fore-color',
    menuChildren: (
      <div class={__S_['color-box']} style={'background-color: #000'}></div>
    ),
    panelChildren: (
      <div class={__S_['color-input']} />
    ),
    onMouseDown: e => {
      e.preventDefault()
      const colorValue = dropDown.$container.find(__S_['color-box'].selector).css('background-color')

      if (!isAvailable()) {
        return
      }
      document.execCommand('foreColor', false, colorValue)
      $(document).trigger('selectionchange')
    }
  })

  const $menu = dropDown.$container.find(__S_['color-input'].selector)
  var hueb = new Huebee($menu.get(0), {
    customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ],
    setText: false,
    setBGColor: false,
    saturations: 2,
    staticOpen: true
  })

  hueb.on('change', (color, hue, sat, lum) => {
    dropDown.$container.find(__S_['color-box'].selector).css({
      'background-color': color
    })
    document.execCommand('foreColor', false, color)
    dropDown.togglePanel()
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => {
        dropDown.enable()
      })

      const range = getRange()
      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => {
          dropDown.disable()
        })
      }
    } else {
      toDisable($selector, __S_, () => {
        dropDown.disable()
      })
    }
  })
}

const foreColor = {
  name: 'fore-color',
  run: sciprt,
  style
}

export default foreColor
