import {
  getRange,
  hasTagsOrInRange,
  isFullRangeInTag,
  isSelectionCaret,
  isSelectionRange,
  nodeInTag,
  setSelection
} from 'utils/selection'

import style from './link.scss'

const defaults = {
  tooltip: '链接'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['link-panel']}>
        <div class={`${__S_['link-panel__content-wrap']} ${__S_['input-filed']}`}>
          <label>文本内容</label>
          <input class={__S_['link-panel__content']} placeholder="Link Text" />
        </div>
        <div class={`${__S_['link-panel__url-wrap']} ${__S_['input-filed']}`}>
          <label>链接地址 (Format: http://...)</label>
          <input class={__S_['link-panel__url']} placeholder="http://..." />
        </div>
        <div class={`${__S_['link-panel__target-wrap']} ${__S_['input-filed']}`}>
          <label>打开方式: </label>
          <select class={__S_['link-panel__target']}>
            <option value="_blank">新窗口</option>
            <option value="_self">当前窗口</option>
          </select>
        </div>
        <div class={`${__S_['link-panel__submit-wrap']} ${__S_['input-filed']}`}>
          <a class={__S_['u-submit']} href="javascript:;">确定</a>
        </div>
      </div>
    )
  })

  const $url = panel.$container.find(__S_['link-panel__url'].selector)
  const $target = panel.$container.find(__S_['link-panel__target'].selector)
  const $content = panel.$container.find(__S_['link-panel__content'].selector)
  const $contentWrap = panel.$container.find(__S_['link-panel__content-wrap'].selector)
  const $submit = panel.$container.find(__S_['u-submit'].selector)

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
    vars.cacheRange = range

    if (isFullRangeInTag(range, 'A')) {
      const node = nodeInTag(range.startContainer, 'A')
      const $node = $(node)

      $contentWrap.hide()
      vars.isEdit = true
      vars.linkNode = node
      $url.val($node.attr('href'))
      $target.val($node.attr('target'))
      $content.val($node.html())
    } else {
      vars.isEdit = false
      vars.linkNode = null
      $url.val('')
      $target.val('_self')

      if (isSelectionRange()) {
        const $a = $('<div />').append(range.cloneContents())
        $contentWrap.hide()
        $content.val($a.html())
      }

      if (isSelectionCaret()) {
        $contentWrap.show()
        $content.val('')
      }
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
  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (range === null) return

      if (hasTagsOrInRange(range, ['PRE'])) {
        util.toDisable(() => menu.disable())
      }

      if (isFullRangeInTag(range, 'A')) {
        menu.turnOn()

        const node = nodeInTag(range.startContainer, 'A')
        if (node !== cacheNode) {
          $(cacheNode).attr('data-heditor-selected', '0')
        }

        cacheNode = node
        $(cacheNode).attr('data-heditor-selected', '1')
      } else {
        menu.turnOff()
        $(cacheNode).attr('data-heditor-selected', '0')
      }
    }
  })
}

const link = {
  name: 'link',
  run: sciprt,
  style
}

export default link
