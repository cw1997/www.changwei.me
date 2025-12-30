%%raw(`
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
`)

@react.component
let make = () => {
  let (now, setNow) = React.useState(() => Dayjs.make())
  
  React.useEffect0(() => {
    let intervalId = setInterval(() => {
      setNow(_ => Dayjs.make())
    }, 1000)
    
    Some(() => clearInterval(intervalId))
  })
  
  <span>
    {now->Dayjs.tz("Asia/Taipei")->Dayjs.format("dddd YYYY-MM-DD HH:mm:ss")->React.string}
  </span>
}
