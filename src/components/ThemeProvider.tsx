"use client"

import {ConfigProvider, theme} from "antd"
import React, {createContext, useContext, useEffect, useState} from "react"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FunctionComponent<{children: React.ReactNode}> = ({children}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null
    if (saved === "dark" || saved === "light") {
      setThemeMode(saved)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode)
    localStorage.setItem("theme", themeMode)
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{themeMode, toggleTheme}}>
      <ConfigProvider
        theme={{
          algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
