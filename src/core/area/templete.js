const Area = {
  render ({ props }) {
    return (
      <div class={`${props.__S_.area} ${props.namespace.area}`} contenteditable="true" spellcheck="true"><div><br /></div></div>
    )
  }
}

export default Area
