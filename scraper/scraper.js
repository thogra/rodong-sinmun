const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const _ = require('lodash');
const { cleanHref } = require('./rodong-utils');

const baseUrl = 'http://www.rodong.rep.kp';

async function fetchImage(url) {
  try {
    const response = await fetch(url, {timeout: 30000});
    if (response.status === 200) {
      const buffer = await response.buffer();
      return buffer.toString('base64');
    }
  } catch(e) {
    console.log('could not fetch image', url);
  }
  return undefined;
}

const fetchImagePage = async (base, imagePath) => {
  const response = await fetch(`${base}/en/${imagePath}`, {timeout: 30000});
  const body = await response.text();
  const $ = cheerio.load(body);
  const imageElements = $('#slides .slide img').toArray();

  const images = _.map(imageElements, (image) => {
    const url = baseUrl + $(image).attr('src');
    return {
      url,
      height: $(image).attr('height'),
      width: $(image).attr('width'),
    };
  });

  if(_.get(images, '0.url')) {
    const firstImageUrl = _.get(images, '0.url');
    const dataUrl = await fetchImage(firstImageUrl);
    _.set(images, '0.dataUrl', dataUrl)
  }
  return images;
};

const fetchArticlePage = async (articleUrl) => {
  const response = await fetch(`${articleUrl}`, { timeout: 30000 });
  if (response.status !== 200) {
    console.error(
      `Got response status ${response.status} for article: `,
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
        try {
          const articleData = await fetchArticlePage(item.url);
          return { ...item, ...articleData };
        } catch(err) {
          console.log('Could not fetch article page', err);
        }
      }
      return item;
    }),
  );

  const data = {
    title: 'Rodong Sinmun',
    topNews: withContents,
    dateScraped: new Date().toISOString(),
  }

  fs.writeFileSync('./data/rodong.json', JSON.stringify(data, null, 2));

  return body;
};

fetchBasePage();
