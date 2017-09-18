const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')

  new widget.Menu($menuPoint.get(0), {
    icon: 'modules'
  })

  // listenArea($selector, el.$area, __S_)
}

const modules = {
  name: 'modules',
  run: sciprt,
  style: ''
}

export default modules
