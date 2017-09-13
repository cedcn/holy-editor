import { element } from 'deku'

const Bold = {
  title: 'bold',
  render ({ props }) {
    const { styles, controls } = props

    return (
      <div>
        <controls.Menu icon="bold" styles={styles} />
      </div>
    )
  }
}

export default Bold
