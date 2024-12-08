async function updateProjectData(projectId, title, description) {
  const response = await fetch(`/api/update-project?id=${projectId}`, { // Update this line
    method: 'PUT',  // Use PUT for updating
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