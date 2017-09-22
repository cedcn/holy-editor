const sciprt = options => ({ el, widget, __S_, $selector }) => {
  new widget.Menu($selector, {
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
