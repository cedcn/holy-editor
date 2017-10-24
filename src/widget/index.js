import Menu from './menu'
import Modal from './modal'
import ColorMenu from './color_menu'
import SelectMenu from './select_menu'
import Popover from './popover'

const widget = theme => {
  Menu.__S_ = theme
  Modal.__S_ = theme
  ColorMenu.__S_ = theme
  SelectMenu.__S_ = theme
  Popover.__S_ = theme

  return {
    Menu,
    ColorMenu,
    Modal,
    SelectMenu,
    Popover
  }
}

export default widget
