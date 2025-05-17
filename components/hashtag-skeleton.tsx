import { Card, CardContent, CardHeader, Skeleton, Box } from "@mui/material"

const HashtagSkeleton = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <CardHeader
        title={<Skeleton variant="text" width="60%" height={40} />}
        subheader={<Skeleton variant="text" width="40%" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Box sx={{ height: 300, width: "100%", mt: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default HashtagSkeleton
