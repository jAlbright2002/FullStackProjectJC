async function handler(req, res) {
    const { id } = req.query; // Get 'id' from query parameters
  
    try {
      // Assuming you're calling a backend service (like your local server or DB)
      const response = await fetch(`http://localhost:8000/getProject/${id}`, {
        method: 'GET', // Using GET since we're fetching data
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return res.json(data); // Return the fetched data
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ error: 'Could not fetch project' });
    }
  }
  
  export default handler;
  