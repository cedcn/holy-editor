import $ from 'jquery'
const $document = $(document)

// Gain selection type
export const getSelectionType = selection => {
  return selection.type
}

export const isSelectionNone = selection => {
  return getSelectionType(selection) === 'None'
}

export const isSelectionCaret = selection => {
  return getSelectionType(selection) === 'Caret'
}

export const isSelectionRange = selection => {
  return getSelectionType(selection) === 'Range'
}

export const createEmptySelection = () => {

}

export const isContainsSelection = (selection, $area) => {
  const node = selection.anchorNode
  return $area.get(0).contains(node)
}


export const isContainCurrentSelection = $area => {
  const selection = window.getSelection()
  return isContainsSelection(selection, $area)
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

export const listenArea = ($selector, $area, __S_) => {
  $document.on('selectionchange', () => {
    if (isContainCurrentSelection($area)) {
      $selector.addClass(__S_['is-available'].className)
    } else {
      $selector.removeClass(__S_['is-available'].className)
    }
  })
}
