import Menu from '../../controls/menu'

const size = ({ styles }) => {
  const btn = new Menu({
    icon: 'size',
    styles,
    click: e => {
      console.log(12)
    }
  })

  return btn
}

export default size
