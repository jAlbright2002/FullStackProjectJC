import ProjectDetail from '../../components/projects/ProjectDetail'
import { useRouter } from 'next/router';

function ProjectDetails() {
    const router = useRouter();
    console.log("I'm a hard coded page; I'm supposed to be " + router.query.meetupId)
    return (
        <ProjectDetail
            image='https://www.planetware.com/photos-large/SEY/best-islands-maldives.jpg'
            title='Some address, Barna, Galway'
            description='First meetup description' >
        </ProjectDetail >
    )
}

export default ProjectDetails;