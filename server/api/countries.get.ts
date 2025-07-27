// Example API route - replace with your domain-specific logic
export default eventHandler(async () => {
  try {
    // Example: return static data
    // In a real app, you might fetch from a database or external API
    return [
      { id: '1', label: 'Example Organization 1' },
      { id: '2', label: 'Example Organization 2' },
      { id: '3', label: 'Example Organization 3' },
    ]
  }
  catch (error) {
    console.error('Error fetching data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data',
    })
  }
})
