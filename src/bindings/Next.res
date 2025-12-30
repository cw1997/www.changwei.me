// Next.js bindings for ReScript

// Link component
module Link = {
  @react.component @module("next/link")
  external make: (
    ~href: string,
    ~className: string=?,
    ~style: ReactDOM.Style.t=?,
    ~target: string=?,
    ~rel: string=?,
    ~prefetch: bool=?,
    ~children: React.element=?,
  ) => React.element = "default"
}

// Image component
module Image = {
  type staticImageData = {
    src: string,
    height: int,
    width: int,
  }

  @react.component @module("next/image")
  external make: (
    ~src: string,
    ~alt: string,
    ~width: int=?,
    ~height: int=?,
    ~className: string=?,
    ~priority: bool=?,
    ~quality: int=?,
    ~fill: bool=?,
  ) => React.element = "default"
}

// Script component
module Script = {
  type dangerouslySetInnerHTMLObj = {__html: string}

  @react.component @module("next/script")
  external make: (
    ~id: string=?,
    ~src: string=?,
    ~async: bool=?,
    ~strategy: string=?,
    ~onLoad: unit => unit=?,
    ~dangerouslySetInnerHTML: dangerouslySetInnerHTMLObj=?,
    ~children: React.element=?,
  ) => React.element = "default"
}

// usePathname hook
@module("next/navigation")
external usePathname: unit => string = "usePathname"

// useRouter hook
module Router = {
  type t = {
    push: string => unit,
    replace: string => unit,
    back: unit => unit,
    forward: unit => unit,
    refresh: unit => unit,
    prefetch: string => unit,
  }
}

@module("next/navigation")
external useRouter: unit => Router.t = "useRouter"

// useSearchParams hook
module SearchParams = {
  type t

  @send external get: (t, string) => Null.t<string> = "get"
  @send external getAll: (t, string) => array<string> = "getAll"
  @send external has: (t, string) => bool = "has"
  @send external toString: t => string = "toString"
}

@module("next/navigation")
external useSearchParams: unit => SearchParams.t = "useSearchParams"

// Metadata type for layout and page
module Metadata = {
  type author = {
    name: string,
    url: option<string>,
  }

  type openGraph = {
    siteName: option<string>,
    title: string,
    description: string,
    url: string,
    images: string,
  }

  type twitter = {
    card: string,
    title: string,
    description: string,
    images: string,
  }

  type titleTemplate = {
    default: string,
    template: string,
  }

  type t = {
    metadataBase: option<JSON.t>,
    title: titleTemplate,
    description: string,
    authors: array<author>,
    keywords: array<string>,
    openGraph: openGraph,
    twitter: twitter,
  }
}

// Font loaders
module Font = {
  module NotoSansSC = {
    type t = {className: string}

    @module("next/font/google") @val
    external make: {..} => t = "Noto_Sans_SC"
  }
}
