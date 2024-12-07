export default async function handler(req, res) {
    const { id } = req.query;  // Extract the id from the query parameters
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/deleteProject/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      res.status(200).json(data);  // Return the data as JSON
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }