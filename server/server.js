const express = require('express');
const cors = require('cors');
const path = require('path');
const enquiriesRouter = require('./routes/enquiries');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Body parsing with strict size limit to prevent abuse
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Shrikha Finserv API',
    timestamp: new Date().toISOString()
  });
});

// Enquiries Endpoint
app.use('/api/enquiries', enquiriesRouter);

// Serve static assets in production if dist exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// For SPA routing in production
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Shrikha Finserv API Server is running. Frontend dev server is on port 3000.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Shrikha Finserv Server] Running on http://localhost:${PORT}`);
  console.log(`[API Endpoints] POST http://localhost:${PORT}/api/enquiries`);
});
