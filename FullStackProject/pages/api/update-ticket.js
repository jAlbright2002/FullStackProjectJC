export default async function handler(req, res) {
    const { ticketId, title, description, projectId } = req.body;
  
    try {
      const response = await fetch(`http://localhost:8000/updateTicket/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId,
          title,
          description,
          projectId,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data); 
      } else {
        res.status(response.status).json({ message: 'Failed to update project', error: data });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  