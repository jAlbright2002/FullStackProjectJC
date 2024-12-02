let express = require('express');
let router = express.Router();

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

let meetingSchema = new Schema({
  meetingId: String,
  title: String,
  image: String,
  address: String,
  description: String
}, { collection: 'meetings' });

let meetings = oldMong.model('meetings', meetingSchema);

router.get('/', async function (req, res, next) {
  const meetings = await getMeetings();
  res.render('index');
});

router.post('/getProjects', async function (req, res, next) {
  const meetings = await getMeetings();
  res.json(meetings);
});

async function getMeetings() {
  data = await meetings.find().lean();
  return { meetings: data };
}

router.post('/saveProject', async function (req, res, next) {
  const meetings = await saveMeeting(req.body);
  res.json(meetings);
});

async function saveMeeting(theMeeting) {
  console.log('theMeeting: ' + theMeeting);
  await meetings.create(theMeeting,
    function (err, res) {
      if (err) {
        console.log('Could not insert new meeting')
        return { saveMeetingResponse: "fail" };
      }
    }
  )
  return { saveMeetingResponse: "success" };
}

let ticketSchema = new Schema({
  title: String,
  description: String,
  project: String
}, { collection: 'ticket' });

let ticket = oldMong.model('ticket', meetingSchema);

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

router.post('/saveProject', async function (req, res, next) {
  const tickets = await saveTicket(req.body);
  res.json(tickets);
});

async function saveTicket(theTicket) {
  console.log('theTicket: ' + theTicket);
  await meetings.create(theTicket,
    function (err, res) {
      if (err) {
        console.log('Could not insert new ticket')
        return { saveMeetingResponse: "fail" };
      }
    }
  )
  return { saveMeetingResponse: "success" };
}

module.exports = router;