import HolyEditor from './core/holy-editor'

// toolbar
import title from './extension/tools/title'
import bold from './extension/tools/bold'
import italic from './extension/tools/italic'
import underline from './extension/tools/underline'
import strikeThrough from './extension/tools/strike_through'
import foreColor from './extension/tools/fore_color'
import modules from './extension/tools/modules'
import orderList from './extension/tools/order_list'
import unorderList from './extension/tools/unorder_list'
import image from './extension/tools/image'

// theme
import tacitly from './extension/themes/tacitly'

HolyEditor.register('tools', title)
HolyEditor.register('tools', bold)
HolyEditor.register('tools', italic)
HolyEditor.register('tools', underline)
HolyEditor.register('tools', strikeThrough)
HolyEditor.register('tools', foreColor)
HolyEditor.register('tools', modules)
HolyEditor.register('tools', orderList)
HolyEditor.register('tools', unorderList)
HolyEditor.register('tools', image)

HolyEditor.register('themes', tacitly)

export default HolyEditor
