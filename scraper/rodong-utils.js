const _ = require('lodash');

module.exports = {
  cleanHref: function (href) {
    if (_.startsWith(href, 'javascript:article_open(')) {
      return href.substring(
        'javascript:article_open('.length + 1,
        href.length - 2,
      );
    }
    return href;
  },
};
