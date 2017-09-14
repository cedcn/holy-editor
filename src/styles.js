import csjs, { getCss } from 'csjs'
import insertCss from 'insert-css'

import css from './style/index.scss'

const styles = csjs`${css}`

insertCss(getCss(styles))

export default styles
