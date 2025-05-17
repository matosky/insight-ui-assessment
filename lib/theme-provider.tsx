"use client"

import { createContext, useState, useMemo, useEffect, type ReactNode } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { blue, pink, grey } from "@mui/material/colors"

// Create context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Try to get the user's preference from localStorage
  const [mode, setMode] = useState<"light" | "dark">("light")

  // Effect to load the theme preference from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode") as "light" | "dark" | null
    if (storedMode) {
      setMode(storedMode)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // Use system preference as fallback
      setMode("dark")
    }
  }, [])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light"
          // Save to localStorage
          localStorage.setItem("themeMode", newMode)
          return newMode
        })
      },
    }),
    [],
  )

  // Update the theme only if the mode changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: blue[500],
          },
          secondary: {
            main: pink[400],
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? grey[900] : grey[100],
            secondary: mode === "light" ? grey[700] : grey[400],
          },
        },
        typography: {
          fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === "light" ? "0 4px 20px rgba(0,0,0,0.08)" : "0 4px 20px rgba(0,0,0,0.4)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: mode === "light" ? "0 10px 25px rgba(0,0,0,0.12)" : "0 10px 25px rgba(0,0,0,0.6)",
                },
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}
