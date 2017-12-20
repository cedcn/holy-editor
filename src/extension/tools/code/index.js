import {
  hasTagInNode,
  nodeInTag,
  hasTagsOrInRange,
  getRange
} from 'utils/selection'

import style from './code.scss'

const defaults = {
  tooltip: '代码',
  codes: ['bash', 'javascript', 'ruby', 'python', 'html', 'css', 'php', 'json', 'xml', 'sql', 'java', 'swift', 'go', 'rust']
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)

  const codes = opts.codes.map(item => ({ label: item, value: item }))
  const menu = new widget.SelectMenu($selector, {
    options: [{
      label: 'code',
      value: ''
    }, ...codes],
    tooltip: opts.tooltip,
    onSelect: checked => {
      const range = getRange()
      const snode = nodeInTag(range.startContainer, 'PRE')
      const enode = nodeInTag(range.endContainer, 'PRE')

      if (range.collapsed) {
        if (snode === null) {
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs" data-value="${checked.value}" data-label="${checked.label}"><br/></pre>`)
        } else {
          snode.setAttribute('class', `${checked.value} hljs`)
          snode.dataset.value = checked.value
          snode.dataset.label = checked.label
        }
      } else {
        if (snode === null && enode === null) {
          const text = range.toString()
          document.execCommand('insertHTML', false, `<pre class="${checked.value} hljs" data-value="${checked.value}" data-label="${checked.label}">${text}</pre>`)
        }

        if (snode !== null && enode !== null && snode === enode) {
          snode.setAttribute('class', `${checked.value} hljs`)
          snode.dataset.value = checked.value
          snode.dataset.label = checked.label
        }
      }
    }
  })

  el.$area.on('keydown', e => {
    if (e.which === 13) {
      const range = getRange()

      if (range.collapsed) {
        const node = nodeInTag(range.startContainer, 'PRE')

        if (node !== null) {
          e.preventDefault()
          const text = range.endContainer.textContent

          if (range.endContainer.nodeType === 1) {
            document.execCommand('insertHTML', false, '\n\n')
          } else {
            if (!/\n$/.test(text) && range.endContainer.length === range.endOffset) {
              document.execCommand('insertHTML', false, '\n\n')
            } else {
              document.execCommand('insertHTML', false, '\n')
            }
          }
        }
      } else {
        e.preventDefault()
      }
    }
  })

  el.$area.on('mousedown', e => {
    const $pre = el.$area.find('pre')

    $pre.each((index, item) => {
      const $item = $(item)
      if (e.pageY > $item.offset().top + $item.innerHeight()) {
        let $elem = null
        const func = ($item, $area) => {
          if ($item.parent().get(0) === $area.get(0)) {
            $elem = $item
          } else {
            func($item.parent(), $area)
          }
        }

        func($item, el.$area)

        if ($elem.next().length === 0) {
          el.$area.append('<p><br /></p>')
        }
      }
    })
  })

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (hasTagsOrInRange(range, ['BLOCKQUOTE'])) {
        util.toDisable(() => menu.disable())
      }

      if (!range.collapsed) {
        if (hasTagInNode(range.cloneContents(), 'PRE')) {
          util.toDisable(() => menu.disable())
        }
      } else {
        const snode = nodeInTag(range.startContainer, 'PRE')

        if (snode !== null) {
          menu.turnOn()
          menu.setChecked({ value: snode.dataset.value, label: snode.dataset.label })
        } else {
          menu.setChecked({ value: '', label: 'code' })
          menu.turnOff()
        }
      }
    }
  })
}

const code = {
  name: 'code',
  run: sciprt,
  style
}

export default code
