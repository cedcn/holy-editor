import { element } from 'deku'

const Title = {
  title: 'title',
  render ({ props }) {
    const { styles, widget } = props

    return (
      <div class={`${styles.toolbar} ${styles[`toolbar--${Title.title}`]}`}>
        <widget.menu.Tpl icon={Title.title} styles={styles} />
      </div>
    )
  }
}

export default Title
