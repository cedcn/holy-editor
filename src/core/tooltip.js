import { toActive, toDeactive } from 'utils/common'

const tooltip = (className, __S_) => {
  const $tooltip = $(__S_[className].selector)
  const $body = $('body')

  $body.append(`<div class="${__S_['tooltip-text']}"></div>`)
  const $tooltipText = $body.children(__S_['tooltip-text'].selector)

  $tooltip.hover(function () {
    const $this = $(this)
    const text = $this.data('tooltip')
    const { top, left } = $this.offset()

    $tooltipText.css({ top: top + $this.innerHeight(), left: left + $this.innerWidth() / 2 })
    $tooltipText.text(text)

    toActive($tooltipText, __S_)
  }, function () {
    toDeactive($tooltipText, __S_)
  })
}

export default tooltip
