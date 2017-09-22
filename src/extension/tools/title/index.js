
const sciprt = options => ({ el, widget, __S_, $selector }) => {
  new widget.DropDownMenu($selector, {
    icon: 'title'
  })
}

const title = {
  name: 'title',
  run: sciprt,
  style: ''
}

export default title
