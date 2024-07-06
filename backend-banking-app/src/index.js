const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/users'));

console.log("Port is " + config.get('PORT'));
const PORT = config.get('PORT') || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
