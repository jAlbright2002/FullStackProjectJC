let express = require('express');
let router = express.Router();

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

//Project CRUD

let projectSchema = new Schema({
  projectId: String,
  title: String,
  description: String
}, { collection: 'projects' });

let projects = oldMong.model('projects', projectSchema);

router.get('/', async function (req, res, next) {
  const projects = await getAllProjects();
  console.log(projects);
  res.render('index');
});

router.post('/getProjects', async function (req, res, next) {
  const projects = await getAllProjects();
  console.log(projects);
  res.json(projects);
});

async function getAllProjects() {
  data = await projects.find().lean();
  return { projects: data };
}

router.post('/saveProject', async function (req, res, next) {
  const projects = await saveProject(req.body);
  res.json(projects);
});

async function saveProject(project) {
  await projects.create(project,
    function (err, res) {
      if (err) {
        console.log('Could not insert new project')
        return { saveProjectResponse: "fail" };
      }
    }
  )
  return { saveProjectResponse: "success" };
}

router.delete('/deleteProject/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await deleteProject(projectId);
    if (project.deleteProjectResponse === 'success') {
      res.json({ message: 'Project deleted successfully', projectId });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.log('Error deleting project:', err);
    res.status(500).json({ error: 'Could not delete project' });
  }
});


async function deleteProject(projectId) {
  try {
    const deletedProject = await projects.findOneAndDelete({ projectId: projectId });

    if (!deletedProject) {
      console.log('No project found with the given projectId');
      return { deleteProjectResponse: "fail" };
    }

    return { deleteProjectResponse: "success" };
  } catch (err) {
    console.log('Error during delete:', err);
    return { deleteProjectResponse: "fail" };
  }
}

router.put('/updateProject/:id', async (req, res) => {
  const projectId = req.params.id; 
  const updatedData = req.body; 

  try {
    const project = await updateProject(projectId, updatedData);
    if (project.updateProjectResponse === 'success') {
      res.json({ message: 'Project updated successfully', project });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.log('Error updating project:', err);
    res.status(500).json({ error: 'Could not update project' });
  }
});

async function updateProject(projectId, updatedData) {
  try {
    const updatedProject = await projects.findOneAndUpdate(
      { projectId: projectId }, 
      updatedData,              
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      console.log('No project found with the given projectId');
      return { updateProjectResponse: "fail" };
    }

    return { updateProjectResponse: "success", updatedProject };
  } catch (err) {
    console.log('Error during update:', err);
    return { updateProjectResponse: "fail" };
  }
}


//Ticket CRUD

let ticketSchema = new Schema({
  title: String,
  description: String,
  project: String
}, { collection: 'ticket' });

let ticket = oldMong.model('ticket', ticketSchema);

router.get('/', async function (req, res, next) {
  const tickets = await getTicket();
  res.render('index');
});

router.post('/getTickets', async function (req, res, next) {
  const tickets = await getTicket();
  res.json(tickets);
});

async function getTicket() {
  data = await ticket.find().lean();
  return { ticket: data };
}

router.post('/saveTicket', async function (req, res, next) {
  const tickets = await saveTicket(req.body);
  res.json(tickets);
});

async function saveTicket(theTicket) {
  console.log('theTicket: ' + theTicket);
  await projects.create(theTicket,
    function (err, res) {
      if (err) {
        console.log('Could not insert new ticket')
        return { saveTicketResponse: "fail" };
      }
    }
  )
  return { saveTicketResponse: "success" };
}

module.exports = router;