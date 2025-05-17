import Link from "next/link"
import { Card, CardContent, Typography, Box, Button } from "@mui/material"

export default function Home() {
  // Sample hashtags
  const hashtags = ["uri", "nextjs", "react", "typescript"]

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hashtag Sentiment Insights
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track sentiment trends for popular hashtags
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 3 }}>
        {hashtags.map((tag) => (
          <Card key={tag} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" component="div" gutterBottom>
                #{tag}
              </Typography>
              <Link href={`/insights/${tag}`} passHref>
                <Button variant="contained" color="primary" fullWidth>
                  View Insights
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </main>
  )
}
