async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(`http://localhost:8000/getTicket/${id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return res.json(data); 
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return res.status(500).json({ error: 'Could not fetch ticket' });
    }
  }
  
  export default handler;
  