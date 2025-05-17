# Assumptions Made During Development

## Data Structure
- The sentiment data follows a consistent format with date and sentiment value
- Sentiment values range approximately from -1.0 to 1.0
- Dates are provided in ISO format (YYYY-MM-DD)

## API
- The API returns data in a timely manner (simulated with a short delay)
- Error handling is implemented for cases where data might not be available
- The API structure follows RESTful conventions

## User Experience
- Users primarily want to see the trend direction (positive/negative)
- Min/max values are important data points for users
- Interactive features like zoom/pan are valuable for data exploration
- Mobile users need a simplified but functional experience

## Performance
- Chart rendering might be resource-intensive, so lazy loading is appropriate
- Memoization is used to prevent unnecessary re-renders
- SWR is used for efficient data fetching and caching

## Navigation
- URL updates are important for bookmarking and sharing specific hashtag views
- Client-side navigation provides a better user experience than full page reloads

## Accessibility
- Color is not the only indicator of trend direction (icons are also used)
- Interactive elements are properly labeled
- Dark mode support improves accessibility for some users

## Browser Support
- Modern browsers are supported (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features are used
