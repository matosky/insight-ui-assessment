"use client"

import { createTheme } from "@mui/material/styles"
import { blue, pink } from "@mui/material/colors"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[400],
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
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  },
})

export default theme
