import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import sessionRoutes from './routes/sessionRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200', // Angular dev server
    credentials: true, // only if you're using cookies/auth headers
  }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'frontend')));

app.get('/', (req, res) => res.send('MentorHub API Running'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

// Handle requests to other routes (frontend routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, 'frontend', 'dist', 'frontend', 'index.html'),
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
