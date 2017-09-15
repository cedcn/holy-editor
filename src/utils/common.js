import $ from 'jquery'
import remove from 'lodash/remove'

// for clickAtOrigin detect
const waitListen = []

$(document).on('click', e => {
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


export const toCamelCase = str => {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
}
