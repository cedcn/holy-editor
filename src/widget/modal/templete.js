import { element } from 'deku'
import styles from '../../styles'

const Modal = {
  render ({ props }) {
    return (
      <div id={styles['modal-layer']} class={styles['modal-layer']}>
      </div>
    )
  }
}
export default Modal
