import $ from 'jquery'
import { element } from 'deku'
import {
  listenArea
} from 'utils/selection'

import {
  addPoint,
  readImageFile
} from 'utils/common'

import style from './image.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const $menuPoint = addPoint($selector)
  const isAvailable = () => $selector.hasClass(__S_['is-available'].className)

  const $modalPoint = addPoint($selector)
  const panel = (
    <div class={__S_['image-panel']}>
      <input class={__S_['image-upload']} type="file" />
    </div>
  )

  const modal = new widget.Modal($modalPoint.get(0), { panel })

  const $input = $modalPoint.find(__S_['image-upload'].selector)

  $input.on('change', e => {
    readImageFile(e).then(result => {
      modal.close()
      document.execCommand('insertImage', null, result)
    })
  })

  new widget.Menu($menuPoint.get(0), {
    icon: 'image',
    onMouseDown: e => {
      e.preventDefault()
      if (!isAvailable()) {
        return
      }
      modal.open()
    }
  })

  $(document).on('selectionchange', () => {
    if (document.queryCommandState('insertImage')) {
      $selector.addClass(__S_['is-active'].className)
    } else {
      $selector.removeClass(__S_['is-active'].className)
    }
  })

  listenArea($selector, el.$area, __S_)
}

const image = {
  name: 'image',
  run: sciprt,
  style
}

export default image
