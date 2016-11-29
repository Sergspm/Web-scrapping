'use strict';

const needle = require('needle');
const cheerio = require('cheerio');

module.exports = class Links {

  constructor(base_url, page) {
    this.needle = needle || null;
    this.cheerio = cheerio || null;
    this.base_url = base_url || null;
    this.page = page || null;

    this.links = [];
  }

  parse() {
    this.needle.get(this.page, (err, res) => {
      if (err) {
        throw err;
      }

      let $ = this.cheerio.load(res.body);

      $('a[href^="/wiki"]').map((i, e) => {
        if (this.links.indexOf(this.base_url + $(e).attr('href')) > -1) {
          return;
        }
        this.filling($(e).attr('href'));
      });
      console.log(11);
      return this.links;
    });
  }

  filling(elem) {
    return this.links.push(this.base_url + elem);
  }

  checkLimits() {
    //
  }
};