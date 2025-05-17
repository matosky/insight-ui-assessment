"use client"
import { Box, Typography } from "@mui/material"

interface HashtagDropdownProps {
  currentHashtag: string
  onHashtagChange: (hashtag: string) => void
}

const HashtagDropdown = ({ currentHashtag, onHashtagChange }: HashtagDropdownProps) => {
  // Available hashtags
  const hashtags = ["uri", "nextjs", "react", "typescript"]

  // Use a simple select element for maximum compatibility
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2">Select hashtag:</Typography>
      <select
        value={currentHashtag}
        onChange={(e) => {
          // Call the callback to notify parent
          onHashtagChange(e.target.value)
        }}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "14px",
          minWidth: "120px",
        }}
      >
        {hashtags.map((tag) => (
          <option key={tag} value={tag}>
            #{tag}
          </option>
        ))}
      </select>
    </Box>
  )
}

export default HashtagDropdown
