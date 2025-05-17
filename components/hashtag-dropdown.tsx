"use client";

import { Box, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface HashtagDropdownProps {
  currentHashtag: string;
  onHashtagChange: (hashtag: string) => void;
}

const HashtagDropdown = ({ currentHashtag, onHashtagChange }: HashtagDropdownProps) => {
  const theme = useTheme();
  // Available hashtags
  const hashtags = ["uri", "nextjs", "react", "typescript"];

  // Handle change event for Material-UI Select
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newHashtag = event.target.value;
    console.log("Dropdown changed to:", newHashtag);
    onHashtagChange(newHashtag);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2">Select hashtag:</Typography>
      <Select
        value={currentHashtag}
        onChange={handleChange}
        size="small" // Makes the select compact, similar to your original styling
        sx={{
          minWidth: "120px",
          fontSize: "14px",
          "& .MuiSelect-select": {
            padding: "8px 12px",
          },
          borderRadius: "4px",
          border: `1px solid ${theme.palette.divider}`, // Matches your original border
        }}
      >
        {hashtags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            #{tag}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default HashtagDropdown;