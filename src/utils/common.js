import $ from 'jquery'
import remove from 'lodash/remove'
import { createApp } from 'deku'

// for clickAtOrigin detect
const waitListen = []
const $document = $(document)

$document.on('click', e => {
  waitListen.forEach(x => {
    const dom = x[0].get(0)
    if (dom === undefined) return
    if (!$.contains(dom, e.target)) x[1]()
  })
})

export const clickAtOrigin = ($wrapper, cb) => {
  waitListen.push([$wrapper, cb])
}

export const clickRemoveOrigin = $wrapper => {
  remove(waitListen, item => item[0].get(0) === $wrapper.get(0))
}

// 变量名转骆驼峰格式
export const toCamelCase = str => {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
}


/**
  * 为selector 添加一个挂载点
  *
  * @param $selector
  * @return $point
  */

export const addPoint = $selector => {
  $selector.append('<div />')
  const $point = $selector.children().last()
  return $point
}

export const mount = ($selector, jsx) => {
  const $point = addPoint($selector)
  createApp($point.get(0))(jsx)

  const $container = $point.children().first()
  $container.unwrap()
  $container.attr('mounted', 'true')

  return $container
}

/**
  * 该节点是否包含在指定标签的元素节点内 返回该元素节点
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node
  */

export const inElemNode = (node, tagName) => {
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
  * 该节点下是否包含指定标签的元素节点
  *
  * @param [node|documentFargment] node
  * @param string tagName  标签名(大写)
  * @return bool
  */

export const hasElemNode = (node, tagName) => {
  let bool = false
  const func = (node, tagName) => {
    const { children } = node

    if (children.length > 0 & !bool) {
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
  * 指定的Range片段里 是否包含该元素节点
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node
  */

export const isInRange = (range, tagName) => {
  const snode = inElemNode(range.startContainer, tagName)
  const enode = inElemNode(range.endContainer, tagName)

  if (snode !== null || enode !== null) {
    return true
  } else {
    const frag = range.cloneContents()
    return hasElemNode(frag, tagName)
  }
}


/**
  * 指定的Range片段是否全部处于 元素节点内
  *
  * @param node node
  * @param string tagName  标签名(大写)
  * @return node
  */

export const isFullInRange = (range, tagName) => {
  const snode = inElemNode(range.startContainer, tagName)
  const enode = inElemNode(range.endContainer, tagName)

  const frag = range.cloneContents()
  if (snode !== null && enode !== null && !hasElemNode(frag, tagName)) {
    return true
  }

  return false
}



export const toEnable = ($selector, __S_, cb) => {
  $selector.addClass(__S_['is-available'].className)

  if (typeof cb === 'function') cb()
}

export const toDisable = ($selector, __S_, cb) => {
  $selector.removeClass(__S_['is-available'].className)

  if (typeof cb === 'function') cb()
}

export const isAvailable = ($selector, __S_) => {
  return $selector.hasClass(__S_['is-available'].className)
}

// image file to base64
export const readImageFile = event => {
  event.preventDefault()

  let files
  if (event.dataTransfer) {
    files = event.dataTransfer.files
  } else if (event.target) {
    files = event.target.files
  }

  return new Promise((resolve, reject) => {
    if (files.length <= 0) {
      reject(new Error('文件为空'))
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        resolve(reader.result)
      }
    }
  })
}
