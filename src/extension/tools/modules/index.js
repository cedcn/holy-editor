const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')

  new widget.Menu($menuPoint.get(0), {
    icon: 'modules'
  })
}

const modules = {
  name: 'modules',
  run: sciprt
}

export default modules
