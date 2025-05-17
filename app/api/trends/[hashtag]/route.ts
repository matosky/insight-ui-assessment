import { NextResponse } from "next/server"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

// Define the type for our trend data
export interface TrendData {
  hashtag: string
  range: string
  trend: {
    date: string
    sentiment: number
  }[]
}

// Sample data for different hashtags
const trendData: Record<string, TrendData> = {
  uri: {
    hashtag: "#uri",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: -0.2 },
      { date: "2025-04-02", sentiment: 0.0 },
      { date: "2025-04-03", sentiment: 0.1 },
      { date: "2025-04-04", sentiment: 0.3 },
      { date: "2025-04-05", sentiment: 0.2 },
      { date: "2025-04-06", sentiment: 0.4 },
      { date: "2025-04-07", sentiment: 0.5 },
    ],
  },
  nextjs: {
    hashtag: "#nextjs",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.3 },
      { date: "2025-04-02", sentiment: 0.4 },
      { date: "2025-04-03", sentiment: 0.5 },
      { date: "2025-04-04", sentiment: 0.6 },
      { date: "2025-04-05", sentiment: 0.7 },
      { date: "2025-04-06", sentiment: 0.8 },
      { date: "2025-04-07", sentiment: 0.9 },
    ],
  },
  react: {
    hashtag: "#react",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.1 },
      { date: "2025-04-02", sentiment: 0.2 },
      { date: "2025-04-03", sentiment: 0.0 },
      { date: "2025-04-04", sentiment: -0.1 },
      { date: "2025-04-05", sentiment: 0.1 },
      { date: "2025-04-06", sentiment: 0.3 },
      { date: "2025-04-07", sentiment: 0.4 },
    ],
  },
  typescript: {
    hashtag: "#typescript",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.5 },
      { date: "2025-04-02", sentiment: 0.4 },
      { date: "2025-04-03", sentiment: 0.3 },
      { date: "2025-04-04", sentiment: 0.2 },
      { date: "2025-04-05", sentiment: 0.1 },
      { date: "2025-04-06", sentiment: 0.0 },
      { date: "2025-04-07", sentiment: -0.1 },
    ],
  },
}

export async function GET(request: Request, { params }: { params: { hashtag: string } }) {
  // Get the hashtag from the URL
  const { hashtag } = params

  // Simulate network delay (shorter delay for better UX)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return 404 if hashtag doesn't exist in our data
  if (!trendData[hashtag]) {
    return NextResponse.json(
      { error: `No data found for hashtag: ${hashtag}` },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }

  // Return the trend data with no-cache headers
  return NextResponse.json(trendData[hashtag], {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
