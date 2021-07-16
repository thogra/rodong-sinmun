const cheerio = require('cheerio');
const fetch = require('node-fetch');
const _ = require('lodash');
const baseUrl = 'http://www.rodong.rep.kp/en/';

const fetchBasePage = async () => {
  const response = await fetch(baseUrl);
  const body = await response.text();
  const $ = cheerio.load(body);
  // const mainContent = $('body > center > table')[1];
  const revolutionaryActivitiesBox = $('td.centerArticleFirstTitle')
    .first()
    .parent()
    .parent()
    .parent();
  const revolutionaryLinks = $(revolutionaryActivitiesBox)
    .find('td > a')
    .toArray();
  // javascript:article_open('index.php?strPageID=SF01_02_01&newsID=2021-07-12-0003')

  const pureLinks = _.map(revolutionaryLinks, (linkElement) => {
    const href = $(linkElement).attr('href');
    const imgLink = $(linkElement).siblings('nobr').find('a').attr('href');

    if (_.startsWith(href, 'javascript:article_open(')) {
      return {
        url:
          baseUrl +
          href.substring(
            'javascript:article_open('.length + 1,
            href.length - 2,
          ),
        image: imgLink,
      };
    }
    return undefined;
  });

  console.log(_.compact(pureLinks)); // prints a chock full of HTML richness
  return body;
};

fetchBasePage();
