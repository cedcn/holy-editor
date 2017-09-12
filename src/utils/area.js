export const getRange = () => {
  const selection = window.getSelection()
  return selection.getRangeAt(0)
}
