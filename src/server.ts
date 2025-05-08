import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config({ path: './.env.local' });
// require('dotenv/config');
import app from './app';


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
//   .connect("mongodb+srv://sudeeppoojari03:1g9r7LrTCzCxHOJQ@clustername.0lxugqz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterName")
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });