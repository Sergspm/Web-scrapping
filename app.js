'use strict';

const LinksInit = require('./app/Links');

module.exports = {

  parse (base_url, page) {
    /*let Links = new LinksInit(base_url, page);
    return new Promise((resolve, reject) => {
      let links = Links.parse();
      console.log(22);
    });*/
    (new LinksInit(base_url, page))
      .parse()
      .then(links => console.log(links.length));
  }
};
