import React from "react"
import "@/app/globals.scss"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
