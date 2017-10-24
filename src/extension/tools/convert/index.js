import finder from 'findandreplacedomtext'
import style from './convert.scss'

const defaults = {
  tooltip: '文档处理'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const panel = new widget.Popover($selector, {
    panel: (
      <div class={__S_['convert-panel']}>
        <div class={__S_['convert-panel__box']}>
          <div class={__S_['input-filed']}>
            <label><input name="mixed" type="checkbox" checked value="autoSpace"/>中英字符间加空格</label>
          </div>
        </div>
        <a class={`${__S_['u-submit']} ${__S_['convert-panel__submit']}`} href="javascript:;">确定</a>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'convert',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      panel.toggle()
    }
  })

  const $submit = panel.$container.find(__S_['convert-panel__submit'].selector)

  $submit.on('click', () => {
    const $mixed = panel.$container.find('input[name="mixed"]:checked')
    $mixed.each((index, item) => {
      if (item.value === 'autoSpace') {
        const hanzi = '[\u2E80-\u2FFF\u31C0-\u31EF\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]'
        const punc = {
          base: '[@&=_\,\.\?\!\$\%\^\*\-\+\/]',
          open: '[\(\[\{\'"<‘“]',
          close: '[\)\]\}\'">’”]'
        }
        const latin = '[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]' + '|' + punc.base
        const patterns = ['/(' + hanzi + ')(' + latin + '|' + punc.open + ')/ig', '/(' + latin + '|' + punc.close + ')(' + hanzi + ')/ig']

        patterns.forEach(function (exp) {
          finder(el.$area.get(0), {
            find: eval(exp),
            replace: '$1 $2'
          })
        })
      }
    })

    panel.close()
  })

  util.toEnable(() => menu.enable())
}

const convert = {
  name: 'convert',
  run: sciprt,
  style
}

export default convert
