// Loading component

module LoadingOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~style: {..}=?, ~className: string=?) => React.element = "LoadingOutlined"
}

@react.component
let default = () => {
  let styles = %raw(`require("./loading.module.sass")`)
  let iconStyle = %raw(`{fontSize: 64}`)
  let textStyle = %raw(`{fontSize: 24}`)
  
  <div className={styles["container"]}>
    <div>
      <LoadingOutlined style={iconStyle} />
    </div>
    <div style={textStyle}>
      {React.string("Loading...")}
    </div>
  </div>
}
