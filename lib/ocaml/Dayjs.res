// Day.js bindings for ReScript

type t

@module("dayjs") external make: unit => t = "default"
@module("dayjs") external makeFromString: string => t = "default"

@send external format: (t, string) => string = "format"
@send external tz: (t, string) => t = "tz"

// Plugin types
type plugin

@module("dayjs/plugin/utc") external utcPlugin: plugin = "default"
@module("dayjs/plugin/timezone") external timezonePlugin: plugin = "default"

@module("dayjs") @scope("default") external extend: plugin => unit = "extend"
