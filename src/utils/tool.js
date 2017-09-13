export const getAreaStatus = $area => {
  const selection = window.getSelection()
  const text = selection.toString()
  const node = selection.anchorNode

  const isContains = $area.get(0).contains(node)

  if ($area.is(':focus')) {
    if (text.length > 0 && isContains) {
      return 'focus->range'
    } else {
      return 'focus->cursor'
    }
  } else {
    if (text.length > 0 && isContains) {
      return 'blur->range'
    } else {
      return 'blur'
    }
  }
}

export const getRange = () => {
  const selection = window.getSelection()
  return selection.getRangeAt(0)
}

export const isContainsSelection = $area => {
  const selection = window.getSelection()
  const node = selection.anchorNode
  return $area.get(0).contains(node)
}

export const setSelection = (startNode, startOffset, endNode, endOffset) => {
  const range = document.createRange()
  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

export const getLastNode = node => {
  const nodeList = node.childNodes
  const length = nodeList.length

  if (length <= 0) {
    return node
  }
  return getLastNode(nodeList[length - 1])
}

export const initSelection = $area => {
  const node = $area.get(0)
  const lastNode = getLastNode(node)
  setSelection(lastNode, lastNode.length, lastNode, lastNode.length)
}
