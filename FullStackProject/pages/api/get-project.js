async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(`http://localhost:8000/getProject/${id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return res.json(data); 
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ error: 'Could not fetch project' });
    }
  }
  
  export default handler;
  