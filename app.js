'use strict';

const config = require('config');
const http = require('http').createServer();

module.exports = {

  get port () {
    return config.port;
  },

  start () {
    return new Promise((resolve, reject) => {
      http.listen(this.port, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },

  stop () {
    return new Promise((resolve, reject) => {
      http.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
};
