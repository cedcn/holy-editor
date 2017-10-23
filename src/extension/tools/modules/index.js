import { toEnable, toDisable, addTooltip } from 'utils/common'
import style from './modules.scss'

import { getRange, setSelection, isSelectionInArea } from 'utils/selection'
import moduleHead from './module_head.html'
import moduleFoot from './module_foot.html'

const defaults = {
  tooltip: '模块'
}

const sciprt = options => ({ el, widget, __S_, $selector }) => {
  const opts = Object.assign({}, defaults, options)
  let $item
  let $display
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['modules-panel']}>
        <div class={__S_['modules-panel__list']}>
          <a href="javascript:;" data-code={moduleHead}>头部模块</a>
          <a href="javascript:;" data-code={moduleFoot}>底部模块</a>
          <a href="javascript:;" data-code={moduleHead}>头部模块</a>
          <a href="javascript:;" data-code={moduleFoot}>底部模块</a>
          <a href="javascript:;" data-code={moduleHead}>头部模块</a>
          <a href="javascript:;" data-code={moduleFoot}>底部模块</a>
        </div>
        <div class={__S_['modules-panel__right']}>
          <div class={__S_['modules-panel__display']}>
          </div>
          <a class={__S_['modules-panel__submit']} href="javascript:;">插入</a>
        </div>
      </div>
    ),
    onMount () {
      $item = this.$container.find(__S_['modules-panel__list'].selector).find('a')
      $display = this.$container.find(__S_['modules-panel__display'].selector)

      $item.eq(0).addClass(__S_['is-active'].className)
      $display.html($item.eq(0).data('code'))
    }
  })

  const $submit = panel.$container.find(__S_['modules-panel__submit'].selector)

  $submit.on('click', e => {
    e.preventDefault()
    panel.close()
    document.execCommand('insertHTML', false, $display.html())
  })

  $item.on('click', function () {
    $item.removeClass(__S_['is-active'].className)
    $(this).addClass(__S_['is-active'].className)
    $display.html($(this).data('code'))
  })

  const menu = new widget.Menu($selector, {
    icon: 'modules',
    onMouseDown: e => {
      panel.open()
    }
  })

  if (opts.tooltip.length > 0) {
    addTooltip(menu.$container, __S_, opts.tooltip)
  }

  const vars = {
    cacheRange: null
  }

  panel.on('open:before', () => {
    const range = getRange()
    if (range === null) return
    vars.cacheRange = range
  })

  panel.on('close:before', () => {
    setSelection(vars.cacheRange)
  })

  el.$document.on('selectionchange', () => {
    if (isSelectionInArea(el.$area)) {
      toEnable($selector, __S_, () => menu.enable())
    } else {
      toDisable($selector, __S_, () => menu.disable())
    }
  })
}

const modules = {
  name: 'modules',
  run: sciprt,
  style
}

export default modules
