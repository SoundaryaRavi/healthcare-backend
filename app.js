const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const connectDB = require('./config/db'); // Import the database connection


// Connect to MongoDB
connectDB();

const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method; // HTTP method (GET, POST, etc.)
    const url = req.originalUrl; // Requested URL
    const ip = req.ip; // Client IP address

    // Log the request details to the console
    console.log(`[${timestamp}] ${method} ${url} from ${ip}`);
    next(); // Pass control to the next middleware/route handler
});

app.use('/api', routes);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('sendMessage', (message) => {
//     // Broadcast the message to all connected clients
//     io.emit('receiveMessage', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

