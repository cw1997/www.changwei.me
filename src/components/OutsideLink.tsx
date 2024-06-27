export const OutsideLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const {target, rel, ...rest} = props
  return (
    <a
      {...rest}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
    />
  )
}
