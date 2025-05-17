"use client"

import { useMemo } from "react"
import { LineChart } from "@mui/x-charts/LineChart"
import type { ChartsXAxis, ChartsYAxis } from "@mui/x-charts"
import { useTheme } from "@mui/material/styles"
import { useMediaQuery, Box, Typography } from "@mui/material"
import { memo } from "react"

interface SentimentDataPoint {
  date: string
  sentiment: number
}

interface SentimentChartProps {
  data: SentimentDataPoint[]
}

const SentimentChart = ({ data }: SentimentChartProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isDarkMode = theme.palette.mode === "dark"

  // Memoize the processed data to avoid recalculations
  const { xLabels, yValues, minSentiment, maxSentiment, minIndex, maxIndex } = useMemo(() => {
    const xLabels = data.map((item) => {
      const date = new Date(item.date)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })

    const yValues = data.map((item) => item.sentiment)
    const minSentiment = Math.min(...yValues)
    const maxSentiment = Math.max(...yValues)

    // Find indices of min and max values
    const minIndex = yValues.indexOf(minSentiment)
    const maxIndex = yValues.indexOf(maxSentiment)

    return { xLabels, yValues, minSentiment, maxSentiment, minIndex, maxIndex }
  }, [data])

  // Determine chart color based on trend direction
  const chartColor = useMemo(() => {
    const firstValue = data[0]?.sentiment || 0
    const lastValue = data[data.length - 1]?.sentiment || 0
    return lastValue > firstValue ? theme.palette.success.main : theme.palette.error.main
  }, [data, theme.palette])

  // Memoize chart configuration
  const chartConfig = useMemo(() => {
    return {
      series: [
        {
          data: yValues,
          label: "Sentiment",
          color: chartColor,
          showMark: true,
          area: true,
          valueFormatter: (value: number) => value.toFixed(2),
          // Highlight min and max points
          highlightedItems: [
            { itemIndex: minIndex, style: { fill: theme.palette.error.main } },
            { itemIndex: maxIndex, style: { fill: theme.palette.success.main } },
          ],
        },
      ],
      xAxis: [
        {
          data: xLabels,
          scaleType: "point",
          tickLabelStyle: {
            fontSize: isMobile ? 10 : 12,
            angle: isMobile ? 45 : 0,
            fill: theme.palette.text.secondary,
          },
        } as ChartsXAxis,
      ],
      yAxis: [
        {
          min: Math.min(-0.3, minSentiment - 0.1),
          max: Math.max(0.6, maxSentiment + 0.1),
          tickLabelStyle: {
            fontSize: isMobile ? 10 : 12,
            fill: theme.palette.text.secondary,
          },
        } as ChartsYAxis,
      ],
      height: 300,
      margin: {
        left: isMobile ? 40 : 60,
        right: isMobile ? 20 : 40,
        top: 20,
        bottom: isMobile ? 60 : 40,
      },
      slotProps: {
        legend: {
          hidden: isMobile,
          position: { vertical: "top", horizontal: "right" },
          itemMarkWidth: 8,
          itemMarkHeight: 8,
          markGap: 5,
          itemGap: 10,
        },
      },
    }
  }, [yValues, xLabels, chartColor, isMobile, minIndex, maxIndex, minSentiment, maxSentiment, theme])

  return (
    <Box sx={{ height: 350, width: "100%", mt: 2 }}>
      {/* Min/Max Labels */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Min: {minSentiment.toFixed(2)} ({xLabels[minIndex]})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max: {maxSentiment.toFixed(2)} ({xLabels[maxIndex]})
        </Typography>
      </Box>

      <LineChart
        {...chartConfig}
        sx={{
          // Chart background and grid styling based on theme
          "--ChartsBackgroundFill": isDarkMode ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
          "--ChartsGridLineColor": isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
        // Enable zoom and pan interactions
        enableAxisZoom={true}
        axisHighlight={{
          x: "line",
          y: "line",
        }}
        tooltip={{ trigger: "item" }}
      />
    </Box>
  )
}

// Use React.memo to prevent unnecessary re-renders
export default memo(SentimentChart)
