import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Resume 简历",
}

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
