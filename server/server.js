const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use((req, res, next) => {
  const companyIp = "110.235.232.114";
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const firstIp = ip.split(',')[0].trim();

  // Check if the IP matches the company IP
  if (companyIp !== firstIp) {
    return res.status(200).send({ valid: false, message: "Invalid IP", firstIp , companyIp});
  } else {
    req.userIp = firstIp;
    next();
  }
});



// MongoDB setup
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connected');
});

// Import routes
const userRoutes = require('./routes/user');
const User = require('./model/user');

// Routes
app.use('/api/user', userRoutes);



// Mongoose Schema
const checkInOutSchema = new mongoose.Schema({
  //username: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  checkinTime: String,
  checkoutTime: String,
}, { timestamps: true });
const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

app.use(bodyParser.json());

// Routes
app.post('/api/checkin', async (req, res) => {
  const body = req.body;
  const { userId } = body;
  

  if (!userId) {
    return res.status(200).send({ valid: false, message: "order id is required" });
  }
  const nCheckin = new CheckInOut({
    userId: userId,
    checkinTime: new Date()
  })
  try {
    const check = await nCheckin.save();
    return res.status(200).send({ valid: true, message: "checked in.", check: check })
  }
  catch (err) {
    return res.sendStatus(500);
  }
});

app.post('/api/checkout', async (req, res) => {
  const { historyId } = req.body;
  // console.log(historyId);

  if (!historyId) {
    return res.status(200).send({ valid: false, message: "historyId is required." })
  }
  try {
    const updatedCheck = await CheckInOut.findByIdAndUpdate(historyId, {
      checkoutTime: new Date()
    }, { new: true });
    // console.log(updatedCheck);
    if (!updatedCheck) {
      return res.status(200).send({ valid: false, message: "History not found" });
    }
    return res.status(200).send({ valid: true, message: "Checkout.", check: updatedCheck });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});


app.get('/api/history', async (req, res) => {

  const usrId = req.query.id;
  if (usrId === undefined) {
    return res.status(200).send({ valid: false, message: "id is required in query" })
  }
  const isValidId = mongoose.isValidObjectId(usrId);
  if (isValidId === false) {
    return res.status(200).send({ valid: false, message: "Invalid id" })
  }
  try {
    const history = await CheckInOut.find({ userId: usrId });
    // if (history.length === 0) {
    return res.status(200).send({ valid: true, history: history })
    // }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.json(history);
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
