// Notes:
// The database data should be loaded in the root component:
// - see _app.js
// so it should be done in the <Layout> component
// However, we'd then have to pass the data as a property down through
// the component tree . . . more prop drilling!
// So this is a temporary hack . . . means you have to visit the home page 
// in order to get the database data.
// We will fix this and provide a proper solution when we use the Contat API.

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