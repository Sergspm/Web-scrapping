'use strict';
const spawn = require('child_process').spawn;
const app = require('./app');

app
  .start()
  .then(() => {
    spawn("open", ["http://localhost:" + app.port + "/"]);
    console.log(`Application started on: ${app.port}`);
  })
  .catch((err) => console.error(err));
