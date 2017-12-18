const Toolbars = {
  render: ({ props }) => {
    const { tools, __S_, namespace } = props

    const viewer = tools.map((group, index) => {
      const groupList = group.map(item => {
        return (
          <div id={__S_[`tool--${item.name}`]} class={`${__S_.tool} ${__S_[`tool--${item.name}`]}`} />
        )
      })

      return (
        <div class={__S_['tool-group']} data-group-index={index}>{groupList}</div>
      )
    })
    return (
      <div class={`${__S_.toolbars} ${namespace.toolbars}`}>{viewer}</div>
    )
  }
}
export default Toolbars
