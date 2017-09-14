import { element } from 'deku'
import styles from '../styles'

const Area = {
  render ({ props }) {
    return (
      <div class={styles.area} contenteditable="true"></div>
    )
  }
}

export default Area
