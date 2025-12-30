// Ant Design bindings for ReScript

// Space component
module Space = {
  @react.component @module("antd")
  external make: (
    ~align: string=?,
    ~className: string=?,
    ~direction: string=?,
    ~size: int=?,
    ~separator: React.element=?,
    ~wrap: bool=?,
    ~children: React.element=?,
  ) => React.element = "Space"
}

// Divider component
module Divider = {
  @react.component @module("antd")
  external make: (
    ~orientation: string=?,
    ~className: string=?,
    ~style: ReactDOM.Style.t=?,
    ~type_: string=?,
    ~children: React.element=?,
  ) => React.element = "Divider"
}

// Button component
module Button = {
  @react.component @module("antd")
  external make: (
    ~icon: React.element=?,
    ~size: string=?,
    ~className: string=?,
    ~onClick: ReactEvent.Mouse.t => unit=?,
    ~type_: string=?,
    ~htmlType: string=?,
    ~children: React.element=?,
  ) => React.element = "Button"
}

// Dropdown component
module Dropdown = {
  @react.component @module("antd")
  external make: (
    ~menu: {..}=?,
    ~styles: {..}=?,
    ~trigger: array<string>=?,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "Dropdown"
}

// ConfigProvider component
module ConfigProvider = {
  @react.component @module("antd")
  external make: (~theme: {..}=?, ~children: React.element=?) => React.element =
    "ConfigProvider"
}

// Tag component
module Tag = {
  @react.component @module("antd")
  external make: (~className: string=?, ~children: React.element=?) => React.element = "Tag"
}

// Image component
module Image = {
  @react.component @module("antd")
  external make: (
    ~src: string,
    ~alt: string=?,
    ~rootClassName: string=?,
    ~className: string=?,
    ~width: int=?,
    ~height: int=?,
  ) => React.element = "Image"
}

// Timeline component
module Timeline = {
  type item = {
    children: React.element,
    color: option<string>,
  }

  @react.component @module("antd")
  external make: (~items: array<item>=?, ~children: React.element=?) => React.element = "Timeline"

  module Item = {
    @react.component @module("antd") @scope("Timeline")
    external make: (~color: string=?, ~children: React.element=?) => React.element = "Item"
  }
}

// Typography components
module Typography = {
  module Text = {
    @react.component @module("antd") @scope("Typography")
    external make: (~children: React.element=?, ~className: string=?) => React.element = "Text"
  }

  module Title = {
    @react.component @module("antd") @scope("Typography")
    external make: (~level: int=?, ~children: React.element=?, ~className: string=?) => React.element =
      "Title"
  }

  module Paragraph = {
    @react.component @module("antd") @scope("Typography")
    external make: (~children: React.element=?, ~className: string=?) => React.element = "Paragraph"
  }
}

// Card component
module Card = {
  @react.component @module("antd")
  external make: (
    ~title: string=?,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "Card"
}

// List component
module List = {
  type renderItem<'a> = ('a, int) => React.element

  @react.component @module("antd")
  external make: (
    ~dataSource: array<'a>=?,
    ~renderItem: renderItem<'a>=?,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "List"

  module Item = {
    @react.component @module("antd") @scope("List")
    external make: (~children: React.element=?, ~className: string=?) => React.element = "Item"
  }
}

// Row component
module Row = {
  @react.component @module("antd")
  external make: (
    ~gutter: array<int>=?,
    ~align: string=?,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "Row"
}

// Col component
module Col = {
  @react.component @module("antd")
  external make: (
    ~xs: int=?,
    ~sm: int=?,
    ~md: int=?,
    ~lg: int=?,
    ~xl: int=?,
    ~xxl: int=?,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "Col"
}
