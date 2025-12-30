@react.component
let make = (
  ~href: option<string>=?,
  ~target: option<string>=?,
  ~rel: option<string>=?,
  ~className: option<string>=?,
  ~children: option<React.element>=?,
) => {
  let target = target->Option.getOr("_blank")
  let rel = rel->Option.getOr("noopener noreferrer")
  let content = switch children {
  | Some(c) => c
  | None =>
    switch href {
    | Some(h) => React.string(h)
    | None => React.null
    }
  }

  <a ?href ?className target rel> {content} </a>
}
