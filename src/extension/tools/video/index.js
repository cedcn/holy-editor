import style from './video.scss'

import { getRange, setSelection, hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: '视频'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const modal = new widget.Modal($selector, {
    panel: (
      <div class={__S_['video-panel']}>
        <div class={`${__S_['video-panel__url-wrap']} ${__S_['video-panel__filed']}`}>
          <h5>插入视频代码:</h5>
          <textarea name="video-code" class={__S_['video-panel__url']} placeholder="format: <iframe src=... />" />
        </div>
        <div class={`${__S_['video-panel__submit-wrap']} ${__S_['video-panel__filed']}`}>
          <a class={__S_['u-submit']} href="javascript:;">插入</a>
        </div>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'video',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      modal.open()
    }
  })

  const $submit = modal.$container.find(__S_['u-submit'].selector)

  const vars = {
    cacheRange: null
  }

  modal.on('open:before', () => {
    const range = getRange()
    if (range === null) return
    vars.cacheRange = range
  })

  modal.on('close:before', () => {
    setSelection(vars.cacheRange)
  })

  $submit.on('click', () => {
    const videoCode = modal.$container.find('textarea[name="video-code"]').val()

    if (videoCode === '') return
    modal.close()
    document.execCommand('insertHTML', false, videoCode)

    //
    modal.$container.find('textarea').val('')
  })

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (hasTagsOrInRange(range, ['PRE', 'BLOCKQUOTE'])) {
        util.toDisable(() => menu.disable())
      }
    }
  })
}

const video = {
  name: 'video',
  run: sciprt,
  style
}

export default video
