// Bindings for Day.js

type t

@module("dayjs")
external make: unit => t = "default"

@module("dayjs")
external makeFromString: string => t = "default"

@send
external format: (t, string) => string = "format"

@send
external tz: (t, string) => t = "tz"

module Plugin = {
  type pluginFn
  
  @module("dayjs/plugin/utc")
  external utc: pluginFn = "default"
  
  @module("dayjs/plugin/timezone")
  external timezone: pluginFn = "default"
}

type dayjs
@module("dayjs") external dayjs: dayjs = "default"
@send external extend: (dayjs, Plugin.pluginFn) => unit = "extend"
