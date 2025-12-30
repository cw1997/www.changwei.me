@react.component
let make = (
  ~href: option<string>=?,
  ~target: option<string>=?,
  ~rel: option<string>=?,
  ~className: option<string>=?,
  ~style: option<ReactDOM.Style.t>=?,
  ~onClick: option<ReactEvent.Mouse.t => unit>=?,
  ~children: option<React.element>=?,
) => {
  let target = target->Option.getOr("_blank")
  let rel = rel->Option.getOr("noopener noreferrer")
  
  <a
    ?href
    target
    rel
    ?className
    ?style
    ?onClick>
    {children->Option.getOr(
      switch href {
      | Some(h) => React.string(h)
      | None => React.null
      }
    )}
  </a>
}
