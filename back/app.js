import express from 'express'
import { Sequelize } from 'sequelize'

import sequelize from './config_db.js'

import productRoute from './api/product_route.js'
import authRouter from './api/authentication_route.js'

import swagger from './swagger.js'

import cors from "cors";

import { User } from'./models.js'


const app = express()
const port = 3000


// Middleware
app.use(cors());
app.use(express.json());


//Routes
app.use('/api', productRoute)
app.use('/api', authRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

swagger(app)
//handling errors

app.use((err, req, res, next) => {

  if(err instanceof Sequelize.ValidationError) {
    return res.status(400).json({
      message: "Validation error",
      details: err.errors.map(e => e.message)
    })
  }


  console.error(err.stack);
  res.status(500).json({ error: err.message });
});


//connection to server
(async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
})();