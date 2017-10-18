import { element } from 'deku'

const Area = {
  render ({ props }) {
    return (
      <div class={props.__S_.area} contenteditable="true" data-type="normal"></div>
    )
  }
}

export default Area
