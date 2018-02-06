import { isSelectionRange, getRange } from 'utils/selection'
import style from './remove_format.scss'

const defaults = {
  tooltip: '清除格式'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const panel = new widget.Popover($selector, {
    panel: (
      <div class={__S_['remove-format-panel']}>
        <div class={__S_['remove-format-panel__box']}>
          <div class={__S_['input-filed']}>
            <label><input name="isDeep" type="checkbox" value="isDeep"/>是否深度清理</label>
          </div>
        </div>
        <a class={`${__S_['u-submit']} ${__S_['remove-format-panel__submit']}`} href="javascript:;">确定</a>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'remove-format',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      panel.toggle()
    }
  })

  const $submit = panel.$container.find(__S_['remove-format-panel__submit'].selector)

  $submit.on('click', () => {
    const $isDeep = panel.$container.find('input[name="isDeep"]')

    if ($isDeep.is(':checked')) {
      const range = getRange()
      const node = range.cloneContents()
      const text = node.textContent
      document.execCommand('insertHTML', false, text)
    } else {
      document.execCommand('removeFormat')
    }

    el.$document.trigger('selectionchange')
    panel.close()
  })

  util.toEnable(() => menu.enable())

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea && isSelectionRange()) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }
  })
}

const removeFormat = {
  name: 'remove-format',
  run: sciprt,
  style
}

export default removeFormat
