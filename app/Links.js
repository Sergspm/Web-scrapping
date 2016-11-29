'use strict';

const needle = require('needle');
const cheerio = require('cheerio');

module.exports = class Links {

  constructor() {
    this.needle = needle || null;
    this.cheerio = cheerio || null;

    this.base_url = 'https://en.wikipedia.org';
    this.main_page = this.base_url + '/wiki/Main_Page';
    this.links = [];
  }

  filling() {
    this.needle.get(this.main_page, (err, res) => {
      if(err) {
        throw err;
      }

      let $ = this.cheerio.load(res.body);

      $('a[href^="/wiki"]').map((i, e) => {
        if(this.links.indexOf(this.base_url + $(e).attr('href')) > -1) {
          return;
        }
        this.result.push(this.base_url + $(e).attr('href'));
      });
    });
  }

  checkLimits() {
    //
  }
};