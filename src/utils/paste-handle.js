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
export const getPasteHtml = e => {
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

  return pasteHtml
}
