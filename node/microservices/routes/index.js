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
  res.render('index');
});

router.post('/getProjects', async function (req, res, next) {
  const projects = await getAllProjects();
  res.json(projects);
});

async function getAllProjects() {
  data = await projects.find().lean();
  return { projects: data };
}

router.get('/getProject/:id', async function (req, res, next) {
  const { id } = req.params; 
  try {
    const project = await projects.findOne({ projectId: id }).lean();

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);

    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
});

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
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const project = await updateProject(id, updatedData);
    if (project.updateProjectResponse === 'success') {
      res.status(200).json({ message: 'Project updated successfully', project });
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
  projectId: String
}, { collection: 'ticket' });

let tickets = oldMong.model('ticket', ticketSchema);

router.get('/', async function (req, res, next) {
  const tickets = await getTicket();
  res.render('index');
});

router.post('/getTickets', async function (req, res, next) {
  const tickets = await getTickets();
  res.json(tickets);
});

async function getTickets() {
  data = await tickets.find().lean();
  return { ticket: data };
}

router.get('/getTicket/:id', async function (req, res, next) {
  const { id } = req.params; 
  try {
    const ticket = await tickets.findOne({ ticketId: id }).lean();

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);

    res.status(500).json({ error: 'Failed to fetch ticket', details: error.message });
  }
});

router.post('/saveTicket', async function (req, res, next) {
  const tickets = await saveTicket(req.body);
  res.json(tickets);
});

async function saveTicket(theTicket) {
  console.log('theTicket: ' + theTicket);
  await tickets.create(theTicket,
    function (err, res) {
      if (err) {
        console.log('Could not insert new ticket')
        return { saveTicketResponse: "fail" };
      }
    }
  )
  return { saveTicketResponse: "success" };
}

router.delete('/deleteTicket/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await deleteTicket(ticketId);
    if (ticket.deleteTicketResponse === 'success') {
      res.json({ message: 'Ticket deleted successfully', ticketId });
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (err) {
    console.log('Error deleting ticket:', err);
    res.status(500).json({ error: 'Could not delete ticket' });
  }
});


async function deleteTicket(ticketId) {
  try {
    const deletedTicket = await tickets.findOneAndDelete({ ticketId: ticketId });

    if (!deletedTicket) {
      console.log('No ticket found with the given ticketId');
      return { deleteTicketResponse: "fail" };
    }

    return { deleteTicketResponse: "success" };
  } catch (err) {
    console.log('Error during delete:', err);
    return { deleteTicketResponse: "fail" };
  }
}

router.put('/updateTicket/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const ticket = await updateTicket(id, updatedData);
    if (ticket.updateTicketResponse === 'success') {
      res.status(200).json({ message: 'Ticket updated successfully', ticket });
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (err) {
    console.log('Error updating ticket:', err);
    res.status(500).json({ error: 'Could not update ticket' });
  }
});

async function updateTicket(ticketId, updatedData) {
  try {
    const updatedTicket = await tickets.findOneAndUpdate(
      { tickedId: ticketId }, 
      updatedData,              
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      console.log('No ticket found with the given tickedId');
      return { updateTicketResponse: "fail" };
    }

    return { updateTicketResponse: "success", updatedTicket };
  } catch (err) {
    console.log('Error during update:', err);
    return { updateTicketResponse: "fail" };
  }
}

module.exports = router;