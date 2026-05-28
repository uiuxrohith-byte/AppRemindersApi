import express from 'express';
import reminderRoutes from './routes/reminderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Use reminder routes
app.use(express.json());
app.use('/reminders', reminderRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})