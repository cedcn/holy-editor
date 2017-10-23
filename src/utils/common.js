import remove from 'lodash/remove'

// for clickAtOrigin detect
const waitListen = []
const $document = $(document)

$document.on('mousedown', e => {
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

//
export const chunkBy = (arr, char) => {
  let group = [[]]
  let sub = 0
  arr.forEach((item, index) => {
    if (item === '|') {
      group.push([])
      sub++
    } else {
      group[sub].push(item)
    }
  })

  return group
}

//
export const computedFontSize = el => {
  const style = window.getComputedStyle(el, null).getPropertyValue('font-size')
  const fontSize = parseFloat(style)
  return fontSize
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
  deku.createApp($point.get(0))(jsx)

  const $container = $point.children().first()
  $container.unwrap()
  $container.attr('mounted', 'true')

  return $container
}

// Add tooltip
export const addTooltip = ($el, __S_, text) => {
  $el.addClass(__S_['tooltip'].className)
  $el.data('tooltip', text)
}

// to enable selector
export const toEnable = ($selector, __S_, cb) => {
  $selector.addClass(__S_['is-available'].className)

  if (typeof cb === 'function') cb()
}
// to disable selector
export const toDisable = ($selector, __S_, cb) => {
  $selector.removeClass(__S_['is-available'].className)

  if (typeof cb === 'function') cb()
}
export const isAvailable = ($selector, __S_) => {
  return $selector.hasClass(__S_['is-available'].className)
}


// to active selector
export const toActive = ($selector, __S_, cb) => {
  $selector.addClass(__S_['is-active'].className)

  if (typeof cb === 'function') cb()
}
// to deactive selector
export const toDeactive = ($selector, __S_, cb) => {
  $selector.removeClass(__S_['is-active'].className)

  if (typeof cb === 'function') cb()
}
export const isActive = ($selector, __S_) => {
  return $selector.hasClass(__S_['is-active'].className)
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
