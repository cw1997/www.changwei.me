"use client"

import {MoonOutlined, SunOutlined} from "@ant-design/icons"
import {useTheme} from "@/components/ThemeProvider"
import {Button, Tooltip} from "antd"
import React from "react"

export const HeaderDarkModeToggle: React.FunctionComponent = () => {
  const {themeMode, toggleTheme} = useTheme()
  const isDark = themeMode === "dark"

  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <Button
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        type={"text"}
        size={"large"}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
    </Tooltip>
  )
}
