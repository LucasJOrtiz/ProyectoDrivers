require('dotenv').config();
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 5000;
// const PORT = 5000;

conn.sync({ force: false }).then(() => {
  console.log('Conected to data base');

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch (error => {
  console.error('Not conected to DB: ', error);
});
