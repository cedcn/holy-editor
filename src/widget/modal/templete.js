import { element } from 'deku'

const Modal = {
  render ({ props }) {
    const { styles, children } = props

    return (
      <div class={styles.modal}>
        {children}
      </div>
    )
  }
}
export default Modal
