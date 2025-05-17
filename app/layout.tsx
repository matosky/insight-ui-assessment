import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@/lib/theme-provider"
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material"
import ThemeToggle from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hashtag Sentiment Insights",
  description: "Track sentiment trends for hashtags",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AppBar position="static" color="primary" elevation={0}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Hashtag Insights
                </Typography>
                <ThemeToggle />
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Box component="main">{children}</Box>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
