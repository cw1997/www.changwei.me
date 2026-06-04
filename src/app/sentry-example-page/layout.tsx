import type {Metadata} from "next"

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

export default function SentryExamplePageLayout(props: LayoutProps<'/sentry-example-page'>) {
  const {children} = props
  return children
}
