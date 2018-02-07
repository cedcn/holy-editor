const filterStyle = options => html => {
  // 过滤word中状态过来的无用字符
  const docSplitHtml = html.split('</html>')
  if (docSplitHtml.length === 2) {
    html = docSplitHtml[0]
  }

  // 过滤无用标签
  html = html.replace(/<(meta|script|link).+?>/igm, '')

  // 去掉注释
  html = html.replace(/<!--.*?-->/mg, '')

  // 过滤样式
  html = html.replace(/\s?(class|style)=('|").*?('|")/igm, '')

  return html
}

export default filterStyle
