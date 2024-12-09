import ProjectList from '../components/projects/ProjectList'
import { useState, useEffect } from "react";

function HomePage() {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        getAllProjects()
    }, []);

    async function getAllProjects() {
        const response = await fetch('/api/get-projects', {
            method: 'POST',
            body: JSON.stringify({projects: 'all'}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        setProjects(data.projects);
    }

    if (projects == null) {
        return null
    } else {
    return <ProjectList projects={projects} />
    }
}

export default HomePage;