import { notFound } from "next/navigation"
import HashtagTrendCard from "@/components/hashtag-trend-card"

// Disable caching
export const dynamic = "force-dynamic"
export const revalidate = 0

interface PageProps {
  params: {
    hashtag: string
  }
}

export default function HashtagInsightPage({ params }: PageProps) {
  const { hashtag } = params

  // Validate hashtag format
  if (!hashtag || typeof hashtag !== "string" || !hashtag.match(/^[a-zA-Z0-9_]+$/)) {
    notFound()
  }

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Hashtag Sentiment Insights</h1>
      <HashtagTrendCard hashtag={hashtag} />
    </main>
  )
}
