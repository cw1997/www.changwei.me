%%raw(`"use client"`)

@react.component
let make = () => {
  let (now, setNow) = React.useState(() => Dayjs.make())
  
  React.useEffect(() => {
    // Initialize dayjs plugins
    Dayjs.extend(Dayjs.utcPlugin)
    Dayjs.extend(Dayjs.timezonePlugin)
    
    let intervalId = setInterval(() => {
      setNow(_ => Dayjs.make())
    }, 1000)
    
    Some(() => clearInterval(intervalId))
  }, [])
  
  let spanElement = %raw(`function(content) {
    return <span suppressHydrationWarning>{content}</span>
  }`)
  
  spanElement(now->Dayjs.tz("Asia/Taipei")->Dayjs.format("dddd YYYY-MM-DD HH:mm:ss")->React.string)
}
