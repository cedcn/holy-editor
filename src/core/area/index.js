import Area from './templete'
import {
  getRangeAncestorElem,
  getRange,
  isSelectionInArea,
  createSelectionBaseNode,
  createRange
} from 'utils/selection'

const sciprt = ({ options, widget, el, __S_ }) => {
  $(document).on('selectionchange', () => {
    const isInArea = isSelectionInArea(el.$area)

    if (isInArea && el.$area.html() === '') {
      const p = '<p><br /></p>'
      el.$area.append(p)
      createRange(p, 0, p, 0)
    }
  })

  const insertEmptyP = $elem => {
    const $p = $('<p><br></p>')
    $p.insertBefore($elem)
    $elem.remove()
    createSelectionBaseNode($p.get(0), true)
  }

  // 将回车之后生成的非 <p> 的顶级标签，改为 <p>
  const pHandle = e => {
    const range = getRange()
    const elem = getRangeAncestorElem(range)
    const $elem = $(elem)
    const $parentElem = $elem.parent()
    const nodeName = elem.nodeName

    if (!$parentElem.is(el.$area)) return
    if (nodeName === 'P') return
    if ($elem.text()) return

    insertEmptyP($elem)
  }

  el.$area.on('keyup', e => {
    if (e.keyCode !== 13) return
    pHandle(e)
  })
}

const area = {
  Tpl: Area,
  run: sciprt
}

export default area
