import {
  hasTagInNode,
  hasTagsOrInRange,
  nodeInTag,
  getRange
} from 'utils/selection'

const defaults = {
  tooltip: '引用'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const menu = new widget.Menu($selector, {
    icon: 'quote',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      const range = getRange()
      const snode = nodeInTag(range.startContainer, 'BLOCKQUOTE')
      const enode = nodeInTag(range.endContainer, 'BLOCKQUOTE')

      if (range.collapsed) {
        if (snode === null) {
          document.execCommand('insertHTML', false, `<blockquote><div><br/></div></blockquote>`)
        }
      } else {
        if (snode === null && enode === null) {
          const text = range.cloneContents().toString()
          document.execCommand('insertHTML', false, `<blockquote><div>${text}</div></blockquote>`)
        }
      }
    }
  })

  el.$area.on('mousedown', e => {
    const $pre = el.$area.find('blockquote')

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
          el.$area.append('<div><br /></div>')
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
      if (hasTagsOrInRange(range, ['PRE'])) {
        util.toDisable(() => menu.disable())
      }

      if (!range.collapsed) {
        if (hasTagInNode(range.cloneContents(), 'BLOCKQUOTE')) {
          util.toDisable(() => menu.disable())
        }
      } else {
        const snode = nodeInTag(range.startContainer, 'BLOCKQUOTE')

        if (snode !== null) {
          menu.turnOn()
        } else {
          menu.turnOff()
        }
      }
    }
  })
}

const quote = {
  name: 'quote',
  run: sciprt,
  style: ''
}

export default quote
