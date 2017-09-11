import Base from '../base';
import templete from './menu.pug';

class Menu extends Base {
  constructor(icon) {
    super();
    this.icon = icon;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const locals = {
      icon: this.icon
    }

    const viewer = templete(locals);

    return viewer;
  }
}


export default Menu;
