"use client"

import { useState, useEffect } from "react"

interface TrendDataPoint {
  date: string
  sentiment: number
}

interface TrendData {
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

export function useHashtagTrend(hashtag: string): UseHashtagTrendResult {
  const [data, setData] = useState<TrendData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [refreshKey, setRefreshKey] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setData(null) // Clear existing data when fetching new data

      try {
        // Add cache-busting query parameter
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/trends/${hashtag}?t=${timestamp}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [hashtag, refreshKey])

  const mutate = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return { data, isLoading, error, mutate }
}
