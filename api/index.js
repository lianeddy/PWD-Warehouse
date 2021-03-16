const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./handlers');
const { userRoutes, productRoutes } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/', (req, res) => res.status(200).send('nature goods api'));
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

app.use(errorHandler);
const API_PORT = process.env.API_PORT;
require('dotenv').config();

app.listen(API_PORT, async () => {
  // rebuild database based on models dir
  // await sequelize.sync({force: true});
  console.log(`running on ${API_PORT}`);
});
