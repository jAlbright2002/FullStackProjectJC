export default async function handler(req, res) {
    const { id } = req.query; 
    try {
      const response = await fetch(`http://localhost:8000/deleteProject/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      res.status(200).json(data); 
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }