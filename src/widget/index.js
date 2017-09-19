import Menu from './menu'
import Modal from './modal'
import DropDownMenu from './drop_down_menu'
import SelectMenu from './select_menu'

const widget = theme => {
  Menu.__S_ = theme
  DropDownMenu.__S_ = theme
  Modal.__S_ = theme
  SelectMenu.__S_ = theme

  return {
    Menu,
    DropDownMenu,
    Modal,
    SelectMenu
  }
}

export default widget
