// Bindings for Ant Design components

module Space = {
  type direction = [#horizontal | #vertical]
  type size = [#small | #middle | #large]
  
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~direction: option<[#horizontal | #vertical]>=?,
    ~size: option<int>=?,
    ~align: option<string>=?,
    ~wrap: option<bool>=?,
    ~separator: option<React.element>=?,
    ~children: React.element,
  ) => React.element = "Space"
}

module Divider = {
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~orientation: option<[#left | #right | #center | #vertical]>=?,
    ~dashed: option<bool>=?,
    ~plain: option<bool>=?,
    ~children: option<React.element>=?,
  ) => React.element = "Divider"
}

module Tag = {
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~color: option<string>=?,
    ~closable: option<bool>=?,
    ~onClose: option<unit => unit>=?,
    ~children: React.element,
  ) => React.element = "Tag"
}

module Button = {
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~type_: option<[#primary | #default | #dashed | #text | #link]>=?,
    ~size: option<[#small | #middle | #large]>=?,
    ~loading: option<bool>=?,
    ~disabled: option<bool>=?,
    ~onClick: option<ReactEvent.Mouse.t => unit>=?,
    ~href: option<string>=?,
    ~target: option<string>=?,
    ~icon: option<React.element>=?,
    ~children: option<React.element>=?,
  ) => React.element = "Button"
}

module Image = {
  @module("antd") @react.component
  external make: (
    ~src: string,
    ~alt: option<string>=?,
    ~width: option<int>=?,
    ~height: option<int>=?,
    ~preview: option<bool>=?,
    ~fallback: option<string>=?,
    ~rootClassName: option<string>=?,
    ~className: option<string>=?,
  ) => React.element = "Image"
}

module Typography = {
  module Text = {
    @module("antd") @scope("Typography") @react.component
    external make: (
      ~className: option<string>=?,
      ~children: React.element,
    ) => React.element = "Text"
  }
  
  module Link = {
    @module("antd") @scope("Typography") @react.component
    external make: (
      ~href: string,
      ~target: option<string>=?,
      ~className: option<string>=?,
      ~children: React.element,
    ) => React.element = "Link"
  }
}

module Tooltip = {
  @module("antd") @react.component
  external make: (
    ~title: React.element,
    ~placement: option<string>=?,
    ~children: React.element,
  ) => React.element = "Tooltip"
}

module Popover = {
  @module("antd") @react.component
  external make: (
    ~content: React.element,
    ~title: option<React.element>=?,
    ~trigger: option<string>=?,
    ~placement: option<string>=?,
    ~children: React.element,
  ) => React.element = "Popover"
}

module QRCode = {
  @module("antd") @react.component
  external make: (
    ~value: string,
    ~size: option<int>=?,
    ~icon: option<string>=?,
    ~color: option<string>=?,
    ~bgColor: option<string>=?,
  ) => React.element = "QRCode"
}

module Row = {
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~gutter: option<int>=?,
    ~justify: option<string>=?,
    ~align: option<string>=?,
    ~children: React.element,
  ) => React.element = "Row"
}

module Col = {
  @module("antd") @react.component
  external make: (
    ~className: option<string>=?,
    ~span: option<int>=?,
    ~offset: option<int>=?,
    ~children: React.element,
  ) => React.element = "Col"
}

module Dropdown = {
  type menuItem = {
    key: string,
    label: React.element,
    icon: option<React.element>,
  }
  
  type menu = {items: array<menuItem>}
  
  @module("antd") @react.component
  external make: (
    ~menu: menu,
    ~trigger: option<array<string>>=?,
    ~placement: option<string>=?,
    ~children: React.element,
  ) => React.element = "Dropdown"
}

module ConfigProvider = {
  type theme = {token: dict<string>}
  
  @module("antd") @react.component
  external make: (
    ~theme: option<theme>=?,
    ~children: React.element,
  ) => React.element = "ConfigProvider"
}

module AntdRegistry = {
  @module("@ant-design/nextjs-registry") @react.component
  external make: (~children: React.element) => React.element = "AntdRegistry"
}
