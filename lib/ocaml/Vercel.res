// Vercel Analytics and Speed Insights bindings

module Analytics = {
  @react.component @module("@vercel/analytics/next")
  external make: unit => React.element = "Analytics"
}

module SpeedInsights = {
  @react.component @module("@vercel/speed-insights/next")
  external make: unit => React.element = "SpeedInsights"
}
