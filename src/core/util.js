import { isSelectionInArea, getRange } from 'utils/selection'


const util = ({ el, __S_, $selector }) => {
  const $document = $(document)
  const selectionChangeListion = []

  $document.on('selectionchange', () => {
    const isInArea = isSelectionInArea(el.$area)
    const range = getRange()

    selectionChangeListion.forEach(cb => {
      cb(isInArea, range)
    })
  })

  return {
    addSelectionChangeEvent (cb) {
      selectionChangeListion.push(cb)
    },

    // To enable selector
    toEnable (cb) {
      $selector.addClass(__S_['is-available'].className)

      if (typeof cb === 'function') cb()
    },

    // To disable selector
    toDisable (cb) {
      $selector.removeClass(__S_['is-available'].className)

      if (typeof cb === 'function') cb()
    },

    //
    isAvailable () {
      return $selector.hasClass(__S_['is-available'].className)
    }
  }
}

export default util
