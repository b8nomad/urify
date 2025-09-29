import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});