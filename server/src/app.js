const fs = require('fs');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

//middlewares
app.use(express.json());
app.use(cors())
app.use(
  fileUpload({
    tempFileDir: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  })
);

//routes
fs.readdirSync(`${__dirname}/routes`).forEach((file) => {
  const fileName = file.split('.')[0];
  const route = require(`${__dirname}/routes/${file}`);
  app.use(`/api/${fileName}`, route);
});

module.exports = app;
