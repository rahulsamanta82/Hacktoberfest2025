async function fetchMultipleData(urls) {
  try {
    // Start all fetch requests in parallel
    const fetchPromises = urls.map(url => fetch(url));
    // Wait for all requests to complete
    const responses = await Promise.all(fetchPromises);

    // Check for errors in any response
    responses.forEach(response => {
      if (!response.ok) {
        throw new Error(`Error fetching from ${response.url}: ${response.statusText}`);
      }
    });

    // Parse all JSON responses
    const dataPromises = responses.map(response => response.json());
    const allData = await Promise.all(dataPromises);

    // Log and return all fetched data
    console.log('All API Data:', allData);
    return allData;

  } catch (error) {
    console.error('Fetching error:', error);
  }
}

// Example usage with two different APIs:
fetchMultipleData([
  'https://api.example.com/data/1',
  'https://api.example.com/data/2'
]);
