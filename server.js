const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
