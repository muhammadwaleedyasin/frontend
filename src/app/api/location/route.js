export async function GET() {
    try {
      // Replace YOUR_API_KEY with your actual API key
      const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=16f65aaf4b47428a9b8e36a21b2c2443');
      
      // Log the response status
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching location:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch location' }), { status: 500 });
    }
  }
  