import $ from 'jquery'
import size from './toolbar/size'

const toolbar = ({ styles }) => {
  const m = size({ styles })

  const viewer = m.render()
  $('#editor').html(viewer)
}

export default toolbar
