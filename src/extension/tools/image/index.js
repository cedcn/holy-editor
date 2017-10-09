import $ from 'jquery'
import { element } from 'deku'

import {
  isSelectionInArea,
  getRange
} from 'utils/selection'

import {
  isInRange,
  readImageFile,
  toEnable,
  toDisable
} from 'utils/common'

import style from './image.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = (
    <div class={__S_['image-panel']}>
      <input class={__S_['image-upload']} type="file" />
      <input type="text" />
    </div>
  )

  const modal = new widget.Modal($selector, { panel })

  const $input = modal.$container.find(__S_['image-upload'].selector)

  $input.on('change', e => {
    readImageFile(e).then(result => {
      modal.close()
      document.execCommand('insertImage', null, result)
    })
  })

  const menu = new widget.Menu($selector, {
    icon: 'image',
    onMouseDown: e => {
      modal.open()
    }
  })

  $(document).on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (isInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const image = {
  name: 'image',
  run: sciprt,
  style
}

export default image
