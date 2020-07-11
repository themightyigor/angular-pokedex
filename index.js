const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/router');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const port = process.env.port || 1337;

app.listen(port, () => console.log(`Server started on port ${port}`));
