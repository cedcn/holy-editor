/*
    Paste handle
    Reference: WangEditor(https://github.com/wangfupeng1988/wangEditor/blob/master/src/js/util/paste-handle.js)
*/

import { replaceHtmlSymbol } from './common'

// Get paste text
export const getPasteText = e => {
  const clipboardData = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)
  let pasteText
  if (clipboardData == null) {
    pasteText = window.clipboardData && window.clipboardData.getData('text')
  } else {
    pasteText = clipboardData.getData('text/plain')
  }

  return replaceHtmlSymbol(pasteText)
}

// get Paste html
export const getPasteHtml = (e, filterStyle) => {
  const clipboardData = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)
  let pasteText, pasteHtml
  if (clipboardData == null) {
    pasteText = window.clipboardData && window.clipboardData.getData('text')
  } else {
    pasteText = clipboardData.getData('text/plain')
    pasteHtml = clipboardData.getData('text/html')
  }
  if (!pasteHtml && pasteText) {
    pasteHtml = '<p>' + replaceHtmlSymbol(pasteText) + '</p>'
  }
  if (!pasteHtml) {
    return
  }

  // 过滤word中状态过来的无用字符
  const docSplitHtml = pasteHtml.split('</html>')
  if (docSplitHtml.length === 2) {
    pasteHtml = docSplitHtml[0]
  }

  // 过滤无用标签
  pasteHtml = pasteHtml.replace(/<(meta|script|link).+?>/igm, '')
  // 去掉注释
  pasteHtml = pasteHtml.replace(/<!--.*?-->/mg, '')

  if (filterStyle) {
    // 过滤样式
    pasteHtml = pasteHtml.replace(/\s?(class|style)=('|").+?('|")/igm, '')
  } else {
    // 保留样式
    pasteHtml = pasteHtml.replace(/\s?class=('|").+?('|")/igm, '')
  }

  return pasteHtml
}
