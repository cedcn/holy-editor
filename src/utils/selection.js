import { flowRight, some } from 'lodash'

const $document = $(document)

// Gain selection type
export const getSelectionType = selection => {
  return selection.type
}

export const isSelectionNone = () => {
  const selection = window.getSelection()
  return getSelectionType(selection) === 'None'
}

export const isSelectionCaret = () => {
  const selection = window.getSelection()
  return getSelectionType(selection) === 'Caret'
}

export const isSelectionRange = () => {
  const selection = window.getSelection()
  return getSelectionType(selection) === 'Range'
}

export const isContainsSelection = (selection, $area) => {
  const node = selection.anchorNode
  return $area.get(0).contains(node)
}


export const isSelectionInArea = $area => {
  const selection = window.getSelection()
  return isContainsSelection(selection, $area)
}

/**
  * 创建一个range
  *
  */
export const createRange = (startNode, startOffset, endNode, endOffset) => {
  const range = document.createRange()
  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)

  return range
}

/**
  * 将range添加到selection
  * @param range
  */
export const setSelection = range => {
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  return selection
}

// 创建一个selection
export const createSelection = flowRight([setSelection, createRange])

// 获取当前range
export const getRange = () => {
  const selection = window.getSelection()

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    return range
  } else {
    return null
  }
}

export const getLastNode = node => {
  const nodeList = node.childNodes
  const length = nodeList.length

  if (length <= 0) {
    return node
  }
  return getLastNode(nodeList[length - 1])
}

/**
  * 该节点是否包含在指定"Tag"的"元素节点"内 返回该"元素节点"
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node 返回该元素节点
  */
export const nodeInTag = (node, tagName) => {
  let cnode = null

  const func = (node, tagName) => {
    if (node !== null) {
      if (node.tagName === tagName) {
        cnode = node
      } else {
        const pnode = node.parentNode
        func(pnode, tagName)
      }
    }
  }

  func(node, tagName)
  return cnode
}

/**
  * 该"节点对象/文档片段"下是否包含指定"Tag"的"元素节点"
  *
  * @param [node|documentFargment] node
  * @param string tagName  标签名(大写)
  * @return bool
  */
export const hasTagInNode = (node, tagName) => {
  let bool = false
  const func = (node, tagName) => {
    const { children } = node

    if (children.length > 0 && !bool) {
      for (let a = 0; a < children.length; a++) {
        if (children[a].tagName === tagName) {
          bool = true
          break
        }
        func(children[a], tagName)
      }
    }
  }

  func(node, tagName)
  return bool
}

/**
  * 指定的"Range"里 是否包含该指定"Tag"的"元素节点"
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node
  */
export const hasTagInsRangess = (range, tagName) => {
  const snode = nodeInTag(range.startContainer, tagName)
  const enode = nodeInTag(range.endContainer, tagName)

  if (snode !== null || enode !== null) {
    return true
  } else {
    const frag = range.cloneContents()
    return hasTagInNode(frag, tagName)
  }
}

export const hasTagsOrInRange = (range, tagNames = []) => {
  return some(tagNames, tagName => hasTagInsRangess(range, tagName))
}

/**
  * 指定的"Range"是否全部处于"元素节点"内
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node
  */
export const isFullRangeInTag = (range, tagName) => {
  const snode = nodeInTag(range.startContainer, tagName)
  const enode = nodeInTag(range.endContainer, tagName)

  const frag = range.cloneContents()
  if (snode !== null && enode !== null && !hasTagInNode(frag, tagName)) {
    return true
  }

  return false
}

export const initSelection = $area => {
  const node = $area.get(0)
  const lastNode = getLastNode(node)
  createSelection(lastNode, lastNode.length, lastNode, lastNode.length)
}

export const listenArea = ($selector, $area, __S_) => {
  $document.on('selectionchange', () => {
    if (isSelectionInArea($area)) {
      $selector.addClass(__S_['is-available'].className)
    } else {
      $selector.removeClass(__S_['is-available'].className)
    }
  })
}
