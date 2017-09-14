import $ from 'jquery'
import Title from './templete'

const sciprt = ({ el, widget, styles }) => {
  const selector = el.$toolbars.find(styles['modal-layer'].selector)
  const modal = new widget.modal.constructor(selector)

  const mSelector = el.$toolbars.find(styles[`toolbar--${Title.title}`].selector).find(styles.menu.selector)

  $(mSelector).on('click', () => {
    modal.open()
  })
  // const menu = new widget.menu.constructor(mSelector, {
  //   click: () => {
  //     modal.open()
  //   }
  // })
}

const title = {
  Tpl: Title,
  run: sciprt
}

export default title
