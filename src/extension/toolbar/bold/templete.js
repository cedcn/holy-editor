import { element } from 'deku'

const Bold = {
  title: 'bold',
  render ({ props }) {
    const { styles, widget } = props
    return (
      <div class={`${styles.toolbar} ${styles[`toolbar--${Bold.title}`]}`}>
        <widget.menu.Tpl
          icon={Bold.title}
          styles={styles}
        />
      </div>
    )
  }
}

export default Bold
