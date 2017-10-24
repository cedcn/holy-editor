import { clickAtOrigin, mount, addTooltip } from 'utils/common'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import Huebee from 'huebee'
import huebeeCss from './huebee.scss'

const defaults = {
  icon: '',
  tooltip: '',
  onPick: () => {},
  panel: ''
}
const huebeeStyles = noScope`${huebeeCss}`

insertCss(getCss(huebeeStyles))

class ColorMenu {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <div class={this.__S_['color-menu']} data-widget="color-menu">
        <a class={this.__S_['color-menu__button']} href="javascript:;">
          <i class={`${this.__S_['iconfont']} ${this.__S_[iconName]}`} />
          <div class={this.__S_['color-menu__box']} style={'background-color: #000'}></div>
        </a>
        <div class={this.__S_['color-menu__wrapper']}>
          <a class={this.__S_['color-menu__triangle']} href="javascript:;">
            <i class={`${this.__S_.iconfont} ${this.__S_['icon-triangle']}`} />
          </a>
          <div class={this.__S_['color-menu__panel']} onMouseDown={e => e.preventDefault()}>
            <div class={this.__S_['color-menu__input']} />
          </div>
        </div>
      </div>
    )

    this.$container = mount($selector, dom)
    this.$wrapper = this.$container.find(this.__S_['color-menu__wrapper'].selector)
    this.$panel = this.$wrapper.find(this.__S_['color-menu__panel'].selector)
    this.$button = this.$container.find(this.__S_['color-menu__button'].selector)

    const $triangle = this.$container.find(this.__S_['color-menu__triangle'].selector)
    const $colorBox = this.$container.find(this.__S_['color-menu__box'].selector)
    const $input = this.$container.find(this.__S_['color-menu__input'].selector)

    if (this.options.tooltip.length > 0) {
      addTooltip(this.$button, this.__S_, this.options.tooltip)
    }

    const hueb = new Huebee($input.get(0), {
      customColors: this.options.customColors,
      setText: false,
      setBGColor: false,
      saturations: 2,
      staticOpen: true
    })

    hueb.on('change', (color, hue, sat, lum) => {
      console.log(color)
      $colorBox.css({ 'background-color': color })
      this.closePanel()
      this.options.onPick(color)
    })

    this.$button.on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-disabled'].className)) {
        const color = $colorBox.css('background-color')
        this.options.onPick(color)
      }
    })

    $triangle.on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-disabled'].className)) {
        this.togglePanel()
      }
    })

    this.closePanel()
    clickAtOrigin(this.$wrapper, () => this.closePanel())
  }

  togglePanel = () => {
    if (this.$wrapper.hasClass(this.__S_['is-active'].className)) {
      this.closePanel()
    } else {
      this.openPanel()
    }
  }

  openPanel = () => {
    this.$panel.css('display', 'block')
    this.$wrapper.addClass(this.__S_['is-active'].className)
  }

  closePanel = () => {
    this.$panel.css('display', 'none')
    this.$wrapper.removeClass(this.__S_['is-active'].className)
  }

  disable = () => {
    this.$container.addClass(this.__S_['is-disabled'].className)
  }

  enable = () => {
    this.$container.removeClass(this.__S_['is-disabled'].className)
  }

  turnOn = () => {
    this.$container.addClass(this.__S_['is-light'].className)
  }

  turnOff = () => {
    this.$container.removeClass(this.__S_['is-light'].className)
  }
}

export default ColorMenu
