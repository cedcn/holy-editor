import $ from 'jquery'

import {
  isSelectionInArea,
  hasTagInRange,
  getRange,
  setSelection
} from 'utils/selection'

import {
  readImageFile,
  toEnable,
  toDisable
} from 'utils/common'

import style from './image.scss'

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const panel = (
    <div class={__S_['image-panel']}>
      <div class={__S_['switch-tabs']}>
        <div class={__S_['tabs-nav']}>
          <div class={`${__S_['tabs-label']} ${__S_['is-active']}`} data-nav="location">本地上传</div>
          <div class={`${__S_['tabs-label']}`} data-content="remote">远程图片</div>
        </div>
        <div class={__S_['tabs-list']}>
          <div class={`${__S_['tabs-content']} ${__S_['is-active']}`} data-content="location">
            <div class={__S_['tabs-filed']}>
              <label>选择图片:</label>
              <div class={__S_['upload-button']}>
                <div class={__S_['upload-button__icon']}>
                  <i class={`${__S_['iconfont']} ${__S_['icon-upload']}`} />
                </div>
              </div>
              <input class={__S_['upload-input']} type="file" />
            </div>
            <div class={__S_['tabs-filed']}>
              <label>宽度:</label>
              <input name="width" type="text" />
            </div>
            <div class={__S_['tabs-filed']}>
              <label>高度:</label>
              <input name="height" type="text" />
            </div>
            <div class={__S_['tabs-filed']}>
              <a class={__S_['u-submit']} href="javascript:;">插入</a>
            </div>
          </div>
          <div class={`${__S_['tabs-content']}`} data-content="remote">
            <div class={__S_['tabs-filed']}>
              <label>图片地址:</label>
              <input name="url" type="text" />
            </div>
            <div class={__S_['tabs-filed']}>
              <label>宽度:</label>
              <input name="width" type="text" />
            </div>
            <div class={__S_['tabs-filed']}>
              <label>高度:</label>
              <input name="height" type="text" />
            </div>
            <div class={__S_['tabs-filed']}>
              <a class={__S_['u-submit']} href="javascript:;">插入</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const modal = new widget.Modal($selector, { panel })

  const $uploadInput = modal.$container.find(__S_['upload-input'].selector)
  const $uploadButton = modal.$container.find(__S_['upload-button'].selector)
  const $switchTabs = modal.$container.find(__S_['switch-tabs'].selector)
  const $tabsLabel = $switchTabs.find(__S_['tabs-label'].selector)
  const $tabsContent = $switchTabs.find(__S_['tabs-content'].selector)
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

  $tabsLabel.on('click', function () {
    const $this = $(this)
    const index = $this.index()
    $tabsLabel.removeClass(__S_['is-active'].className)
    $this.addClass(__S_['is-active'].className)

    $tabsContent.removeClass(__S_['is-active'].className)
    $tabsContent.eq(index).addClass(__S_['is-active'].className)
  })

  $uploadButton.on('click', () => {
    $uploadInput.trigger('click')
  })

  $uploadInput.on('change', e => {
    readImageFile(e).then(result => {
      $uploadButton.data('url', result)
      $uploadButton.css({ 'background-image': `url(${result})` })
    })
  })

  $submit.on('click', function () {
    const $this = $(this)
    const $content = $this.parents(__S_['tabs-content'].selector)
    let imageUrl
    const imageWidth = $content.find('input[name="width"]').val()
    const imageHeight = $content.find('input[name="height"]').val()
    if ($content.data('content') === 'location') {
      imageUrl = $uploadButton.data('url')
    } else {
      imageUrl = $content.find('input[name="url"]').val()
    }

    if (imageUrl === '') return
    modal.close()
    document.execCommand('insertHTML', false, `<img src="${imageUrl}" width="${imageWidth}"  height="${imageHeight}"/>`)

    //
    $uploadButton.css({ 'background-image': 'none' })
    $uploadButton.data('url', '')
    modal.$container.find('input').val('')
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
      if (hasTagInRange(range, 'PRE')) {
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
