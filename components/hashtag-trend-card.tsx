"use client"

import { useCallback, useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress, Divider } from "@mui/material"
import { TrendingUp, TrendingDown } from "@mui/icons-material"
import SentimentChart from "./sentiment-chart"
import HashtagDropdown from "./hashtag-dropdown"
import { useHashtagTrend } from "@/hooks/use-hashtag-trend"

interface HashtagTrendCardProps {
  hashtag: string
}

const HashtagTrendCard = ({ hashtag: initialHashtag }: HashtagTrendCardProps) => {
  console.log("HashtagTrendCard rendered with initialHashtag:", initialHashtag)

  // Track the current hashtag in component state
  const [hashtag, setHashtag] = useState(initialHashtag)

  // Force component update when hashtag changes
  const [updateKey, setUpdateKey] = useState(0)

  // Update internal hashtag when prop changes
  useEffect(() => {
    console.log("initialHashtag changed to:", initialHashtag)
    setHashtag(initialHashtag)
  }, [initialHashtag])

  // Use SWR hook for data fetching
  const { data, isLoading, error, mutate } = useHashtagTrend(hashtag)

  // Handle hashtag change from dropdown
  const handleHashtagChange = useCallback(
    (newHashtag: string) => {
      console.log("handleHashtagChange called with:", newHashtag)

      if (newHashtag !== hashtag) {
        // Update internal state
        setHashtag(newHashtag)

        // Force component update
        setUpdateKey((prev) => prev + 1)

        // Update URL without page refresh
        window.history.pushState({}, "", `/insights/${newHashtag}`)
      }
    },
    [hashtag],
  )

  // Calculate if trend is positive (last value > first value)
  const isTrendPositive = useMemo(() => {
    if (!data?.trend || data.trend.length < 2) return false
    const firstSentiment = data.trend[0].sentiment
    const lastSentiment = data.trend[data.trend.length - 1].sentiment
    return lastSentiment > firstSentiment
  }, [data?.trend])

  // Handle retry on error
  const handleRetry = useCallback(() => {
    mutate() // SWR's mutate function to retry the request
  }, [mutate])

  // If there's an error, show error state with retry button
  if (error) {
    return (
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error loading hashtag data
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {error.message || "Something went wrong. Please try again."}
          </Typography>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Hashtag Dropdown */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <HashtagDropdown currentHashtag={hashtag} onHashtagChange={handleHashtagChange} />
      </Box>

      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }} key={`card-${updateKey}`}>
        <CardHeader
          title={
            <Typography variant="h5" component="div" fontWeight="bold">
              {data?.hashtag || `#${hashtag}`}
            </Typography>
          }
          subheader={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {data?.range || "Loading date range..."}
              </Typography>
              {data && !isLoading && (
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: isTrendPositive ? "success.main" : "error.main",
                    bgcolor: isTrendPositive ? "success.light" : "error.light",
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    opacity: 0.8,
                  }}
                >
                  {isTrendPositive ? (
                    <>
                      <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="medium">
                        Positive Trend
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="medium">
                        Negative Trend
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          }
          sx={{ pb: 0 }}
        />
        <Divider sx={{ my: 1.5 }} />
        <CardContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                Loading #{hashtag} data...
              </Typography>
            </Box>
          ) : data ? (
            <SentimentChart data={data.trend} key={`chart-${hashtag}-${updateKey}`} />
          ) : null}

          {data && !isLoading && (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 2 }}>
              Tip: Use mouse wheel to zoom, drag to pan the chart
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default HashtagTrendCard
