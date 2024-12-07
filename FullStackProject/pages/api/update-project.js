async function updateProjectData(projectId, title, description) {
    const response = await fetch('http://localhost:8000/updateProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId,
        title,
        description,
      }),
    });
  
    const data = await response.json();
    return data;
}
  