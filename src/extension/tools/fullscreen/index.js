import style from './fullscreen.scss'

const defaults = {
  tooltip: '全屏'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const menu = new widget.Menu($selector, {
    icon: 'fullscreen',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      if (el.$root.hasClass(__S_['is-full'].className)) {
        el.$root.removeClass(__S_['is-full'].className)
        menu.turnOff()
      } else {
        el.$root.addClass(__S_['is-full'].className)
        menu.turnOn()
      }
    }
  })

  util.toEnable(() => menu.enable())
}

const fullscreen = {
  name: 'fullscreen',
  run: sciprt,
  style
}

export default fullscreen
