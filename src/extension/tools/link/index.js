import {
  isSelectionInArea,
  getRange,
  hasTagInRange,
  isFullRangeInTag,
  isSelectionCaret,
  isSelectionRange,
  nodeInTag,
  setSelection
  // initSelection
} from 'utils/selection'

import {
  toEnable,
  toDisable
} from 'utils/common'

import style from './link.scss'

const defaults = {
  tooltip: '链接'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['link-panel']}>
        <div class={`${__S_['link-panel__content-wrap']} ${__S_['link-panel__filed']}`}>
          <h5>文本内容</h5>
          <input class={__S_['link-panel__content']} placeholder="Link Text" />
        </div>
        <div class={`${__S_['link-panel__url-wrap']} ${__S_['link-panel__filed']}`}>
          <h5>链接地址(格式：http://...)</h5>
          <input class={__S_['link-panel__url']} placeholder="http://... " />
        </div>
        <div class={`${__S_['link-panel__target-wrap']} ${__S_['link-panel__filed']}`}>
          <h5>打开方式: </h5>
          <select class={__S_['link-panel__target']}>
            <option value="_blank">新窗口</option>
            <option value="_self">当前窗口</option>
          </select>
        </div>
        <div class={`${__S_['link-panel__submit-wrap']} ${__S_['link-panel__filed']}`}>
          <a class={__S_['link-panel__submit']} href="javascript:;">确定</a>
        </div>
      </div>
    )
  })

  const $url = panel.$container.find(__S_['link-panel__url'].selector)
  const $target = panel.$container.find(__S_['link-panel__target'].selector)
  const $content = panel.$container.find(__S_['link-panel__content'].selector)
  const $contentWrap = panel.$container.find(__S_['link-panel__content-wrap'].selector)
  const $submit = panel.$container.find(__S_['link-panel__submit'].selector)

  const vars = {
    cacheRange: null,
    isEdit: false,
    linkNode: null
  }

  const menu = new widget.Menu($selector, {
    icon: 'link',
    tooltip: opts.tooltip,
    onMouseDown: () => {
      panel.open()
      $url.focus()
    }
  })

  panel.on('open:before', () => {
    const range = getRange()
    if (range === null) return

    vars.cacheRange = range
    const snode = nodeInTag(range.startContainer, 'A')

    $contentWrap.hide()
    vars.isEdit = false
    vars.linkNode = null
    $url.val('')
    $content.val('')
    $target.val('_self')

    if ((isSelectionRange() && isFullRangeInTag(range, 'A')) || (isSelectionCaret() && snode !== null)) {
      vars.isEdit = true
      vars.linkNode = snode
      $url.val($(snode).attr('href'))
      $target.val($(snode).attr('target'))
      $content.val($(snode).html())
    }

    if (isSelectionRange() && !isFullRangeInTag(range, 'A')) {
      const $a = $('<div />').append(range.cloneContents())
      $content.val($a.html())
    }

    if (isSelectionCaret() && snode === null) {
      $contentWrap.show()
    }
  })

  panel.on('close:before', () => {
    setSelection(vars.cacheRange)
  })

  $submit.on('click', e => {
    e.preventDefault()
    panel.close()

    if (!vars.isEdit) {
      document.execCommand('insertHTML', false, `<a href="${$url.val() || '#'}" target="${$target.val() || '_blank'}">${$content.val() || 'Link Text'}</a>`)
    } else {
      $(vars.linkNode).attr({ 'href': $url.val() || '#' })
      $(vars.linkNode).attr({ 'target': $target.val() })
    }
  })

  let cacheNode = null
  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())

      const range = getRange()
      if (range === null) return

      if (hasTagInRange(range, 'PRE')) {
        toDisable($selector, __S_, () => menu.disable())
      }

      if (isFullRangeInTag(range, 'A')) {
        menu.turnOn()
        const snode = nodeInTag(range.startContainer, 'A')
        if (snode !== cacheNode) {
          $(cacheNode).css({ 'background-color': 'transparent' })
        }
        cacheNode = snode
        $(cacheNode).css({ 'background-color': 'rgba(186, 188, 255, 0.5)' })
      } else {
        menu.turnOff()
        $(cacheNode).css({ 'background-color': 'transparent' })
      }
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const link = {
  name: 'link',
  run: sciprt,
  style
}

export default link
