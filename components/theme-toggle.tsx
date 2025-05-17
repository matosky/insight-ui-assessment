"use client"

import { useContext } from "react"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"
import { ColorModeContext } from "@/lib/theme-provider"

const ThemeToggle = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Tooltip title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}>
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
