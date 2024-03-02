if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const router = require('./router');
  const port = 3000;
  const cors = require('cors');
  const app = express();
  
  app.use(cors());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(router);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
