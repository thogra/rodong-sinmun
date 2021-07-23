const cheerio = require('cheerio');
const sizeOf = require('image-size');
const fetch = require('node-fetch');
const _ = require('lodash');
const { cleanHref } = require('./rodong-utils');

const baseUrl = 'http://www.rodong.rep.kp';

const fetchImagePage = async (base, imagePath) => {
  const response = await fetch(`${base}/en/${imagePath}`);
  const body = await response.text();
  const $ = cheerio.load(body);
  const imageElements = $('#slides .slide img').toArray();

  return _.map(imageElements, image => {
    return { 
      url: baseUrl + $(image).attr('src'),
      height: $(image).attr('height'),
      height: $(image).attr('width'),
  }
  });
}

const fetchBasePage = async () => {
  const response = await fetch(baseUrl + '/en/');
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

  const pureLinks = _.compact(_.map(revolutionaryLinks, (linkElement) => {
    const href = $(linkElement).attr('href');
    const imgLink = $(linkElement).siblings('nobr').find('a').attr('href');

    if (_.startsWith(href, 'javascript:article_open(')) {
      return {
        url: `${baseUrl}/en/${cleanHref(href)}`,
        image: cleanHref(imgLink),
      };
    }
    return undefined;
  }));
  
  const withImages = await Promise.all(_.map(pureLinks ,async (item) => {
    if (item.image) {
      const images = await fetchImagePage(baseUrl, item.image);
      return {...item, images };
    }
    return item;
  }));

  console.log('scraped::', withImages);

  return body;
};

fetchBasePage();
