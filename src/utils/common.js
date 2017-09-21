import $ from 'jquery'
import remove from 'lodash/remove'

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
  $selector.append('<div mount-point />')
  const $point = $selector.children().last()
  return $point
}

/**
  * 是否包含在指定标签的元素节点内 返回该元素节点
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
