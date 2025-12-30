// Bindings for Next.js Link component
module Link = {
  @module("next/link") @react.component
  external make: (
    ~href: string,
    ~prefetch: option<bool>=?,
    ~replace: option<bool>=?,
    ~scroll: option<bool>=?,
    ~shallow: option<bool>=?,
    ~passHref: option<bool>=?,
    ~className: option<string>=?,
    ~children: React.element,
  ) => React.element = "default"
}

// Bindings for Next.js Image component
module Image = {
  @module("next/image") @react.component
  external make: (
    ~src: string,
    ~alt: string,
    ~width: option<int>=?,
    ~height: option<int>=?,
    ~fill: option<bool>=?,
    ~quality: option<int>=?,
    ~priority: option<bool>=?,
    ~placeholder: option<string>=?,
    ~className: option<string>=?,
    ~style: option<ReactDOM.Style.t>=?,
  ) => React.element = "default"
}

// Bindings for Next.js Script component
module Script = {
  @module("next/script") @react.component
  external make: (
    ~id: option<string>=?,
    ~src: option<string>=?,
    ~strategy: option<string>=?,
    ~onLoad: option<unit => unit>=?,
    ~onError: option<unit => unit>=?,
    ~async: option<bool>=?,
    ~dangerouslySetInnerHTML: option<{"__html": string}>=?,
    ~children: option<React.element>=?,
  ) => React.element = "default"
}

// Bindings for Next.js font/google
module Font = {
  module Google = {
    type fontConfig = {subsets: array<string>}
    type fontResult = {className: string}
    
    @module("next/font/google")
    external notoSansSC: fontConfig => fontResult = "Noto_Sans_SC"
  }
}
