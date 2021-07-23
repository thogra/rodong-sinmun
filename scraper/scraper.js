const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const _ = require('lodash');
const { cleanHref } = require('./rodong-utils');

const baseUrl = 'http://www.rodong.rep.kp';

const fetchImagePage = async (base, imagePath) => {
  const response = await fetch(`${base}/en/${imagePath}`);
  const body = await response.text();
  const $ = cheerio.load(body);
  const imageElements = $('#slides .slide img').toArray();

  return _.map(imageElements, (image) => {
    return {
      url: baseUrl + $(image).attr('src'),
      height: $(image).attr('height'),
      height: $(image).attr('width'),
    };
  });
};

const fetchArticlePage = async (articleUrl) => {
  const response = await fetch(`${articleUrl}`);
  if (response.status !== 200) {
    console.error(
      `Got response status ${response.status} for url: `,
      articleUrl,
    );
    return undefined;
  }

  const body = await response.text();
  const $ = cheerio.load(body);
  const articleContainer = $('body table').first();
  const title = $(articleContainer)
    .find('.ArticleContent')
    .first()
    .find('font')
    .text();
  const allContent = $(articleContainer).find('.ArticleContent').toArray();
  const paragraphs = _.slice(allContent, 1, allContent.length - 1);
  const paragraphText = _.compact(
    _.map(paragraphs, (paragraph) => _.trim($(paragraph).text())),
  );
  const byline = $(_.last(allContent)).text();

  return {
    title,
    content: paragraphText,
    byline,
  };
};

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

  const pureLinks = _.compact(
    _.map(revolutionaryLinks, (linkElement) => {
      const href = $(linkElement).attr('href');
      const imgLink = $(linkElement).siblings('nobr').find('a').attr('href');

      if (_.startsWith(href, 'javascript:article_open(')) {
        return {
          url: `${baseUrl}/en/${cleanHref(href)}`,
          imagePage: cleanHref(imgLink),
        };
      }
      return undefined;
    }),
  );

  const withImages = await Promise.all(
    _.map(pureLinks, async (item) => {
      if (item.imagePage) {
        const images = await fetchImagePage(baseUrl, item.imagePage);
        return { ...item, images };
      }
      return item;
    }),
  );

  const withContents = await Promise.all(
    _.map(withImages, async (item) => {
      if (item.url) {
        const articleData = await fetchArticlePage(item.url);
        return { ...item, ...articleData };
      }
      return item;
    }),
  );

  fs.writeFileSync('./data/rodong.json', JSON.stringify(withContents, null, 2));

  return body;
};

fetchBasePage();
