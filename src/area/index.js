import { element } from 'deku'

const Area = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={styles.area} contenteditable="true"></div>
    )
  }
}

export default Area
