
const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = $selector.append('<div class="menu-point"></div>')

  new widget.DropDownMenu($menuPoint.get(0), {
    icon: 'title'
  })
}

const title = {
  name: 'title',
  run: sciprt,
  style: ''
}

export default title
