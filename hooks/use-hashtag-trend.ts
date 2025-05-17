"use client"
import useSWR from "swr"
import { useState, useEffect } from "react"

interface TrendDataPoint {
  date: string
  sentiment: number
}

export interface TrendData {
  hashtag: string
  range: string
  trend: TrendDataPoint[]
}

interface UseHashtagTrendResult {
  data: TrendData | null
  isLoading: boolean
  error: Error | null
  mutate: () => void
}

// Create a fetcher function for SWR
const fetcher = async (url: string) => {
  console.log("Fetching data from:", url)
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function useHashtagTrend(hashtag: string): UseHashtagTrendResult {
  // Force a new key when hashtag changes to ensure SWR refetches
  const [swrKey, setSwrKey] = useState<string>(`/api/trends/${hashtag}?t=${Date.now()}`)

  // Update the SWR key when hashtag changes
  useEffect(() => {
    setSwrKey(`/api/trends/${hashtag}?t=${Date.now()}`)
  }, [hashtag])

  // Use SWR for data fetching with the dynamic key
  const { data, error, isLoading, mutate } = useSWR<TrendData>(swrKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 0, // Disable deduping to ensure refetch on hashtag change
    shouldRetryOnError: true,
    errorRetryCount: 3,
  })

  console.log("SWR key:", swrKey, "Data:", data?.hashtag)

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
