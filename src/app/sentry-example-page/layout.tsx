import type {Metadata} from "next"
import type {ReactNode} from "react"

export const metadata: Metadata = {
  title: "Sentry Onboarding",
  description: "Sentry SDK integration test page for www.changwei.me.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

type Props = Readonly<{
  children: ReactNode
}>

export default function SentryExamplePageLayout({children}: Props) {
  return children
}
