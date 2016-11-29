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
    return new Promise((main_resolve, reject) => {
      let self = this;

      function* gen(links) {
        for (let i = 0; i < links.length; ++i) {
          yield self.parseSingle(links[i]);
        }
        return true;
      }

      function rec(links) {
        exec(gen(links))
          .then(() => {
            if (self.links.length < 1000) {
              rec(self.links);
            } else {
              main_resolve(self.links);
            }
          });
      }

      function exec(generator, main_resolve) {
        return new Promise((resolve, reject) => {
          let next = generator.next();
          if (next.done) {
            resolve();
            main_resolve && main_resolve();
          } else {
            next.value.then(() => {
              if (self.links.length >= 1000) {
                resolve();
                main_resolve && main_resolve();
              } else {
                exec(generator, resolve);
              }
            });
          }
        });
      }

      rec([ this.page ]);
    });
  }

  parseSingle(url) {
    return new Promise((resolve, rej) => {
      this.needle.get(url, (err, res) => {
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
        resolve();
      });
    })
  }

  filling(elem) {
    return this.links.push(this.base_url + elem);
  }

  checkLimits() {
    //
  }
};