const express = require('express');
const cors = require('cors');
const db = require('./config.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');

const app = express();
const port = 4500 || process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);

// Check the database connection
db.connect((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to the database successfully');

  // Release the connection back to the pool
  connection.release();

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
