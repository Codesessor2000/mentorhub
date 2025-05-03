import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('MentorHub API Running'));

app.use('/api/auth', authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/availability", availabilityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
