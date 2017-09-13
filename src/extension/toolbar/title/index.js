import { element } from 'deku'

const Title = {
  title: 'title',
  render ({ props }) {
    const { styles, controls } = props

    return (
      <div>
        <controls.Menu icon="bold" styles={styles} />
      </div>
    )
  }
}
export default Title
