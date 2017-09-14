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
