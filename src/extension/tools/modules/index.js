import style from './modules.scss'

import { getRange, setSelection, hasTagsOrInRange } from 'utils/selection'
import moduleStandard from './module_standard.html'

const defaults = {
  tooltip: '模块'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  let $item
  let $display
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['modules-panel']}>
        <div class={__S_['modules-panel__list']}>
          <a href="javascript:;" data-code={moduleStandard}>标准文档格式</a>
        </div>
        <div class={__S_['modules-panel__right']}>
          <div class={__S_['modules-panel__display']}>
            <div class={__S_['modules-panel__display-content']}>
            </div>
          </div>
          <div class={__S_['modules-panel__submit-wrap']}>
            <a class={__S_['u-submit']} href="javascript:;">插入</a>
          </div>
        </div>
      </div>
    ),
    onMount () {
      $item = this.$container.find(__S_['modules-panel__list'].selector).find('a')
      $display = this.$container.find(__S_['modules-panel__display-content'].selector)

      $item.eq(0).addClass(__S_['is-active'].className)
      $display.html($item.eq(0).data('code'))
    }
  })

  const $submit = panel.$container.find(__S_['u-submit'].selector)

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
    tooltip: opts.tooltip,
    onMouseDown: e => {
      panel.open()
    }
  })

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

const modules = {
  name: 'modules',
  run: sciprt,
  style
}

export default modules
