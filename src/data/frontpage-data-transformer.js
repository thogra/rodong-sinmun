import { map, get, words, reverse, isUndefined, random } from 'lodash';

import calculateFontsize from './font-size-calculator';

function limitSize(parts) {
  if (Math.random() > 0.5) {
  }

  return parts;
}

export function splitTitle(title, options = { maxLength: 20 }) {
  const { maxLength } = options;
  const splitTitle = limitSize(words(title));
  const titleParts = reverse(splitTitle);
  const titles = [];
  let currentLine = '';

  while (titleParts.length > 0) {
    let part = titleParts.pop();
    if (isUndefined(part)) {
      titles.push(currentLine);
      currentLine = '';
      break;
    }

    if (currentLine.length > 0) {
      currentLine = currentLine + ' ';
    }
    currentLine += part;
    if (currentLine.length > maxLength) {
      titles.push(currentLine);
      currentLine = '';
    }
  }
  if (currentLine.length > 0) {
    titles.push(currentLine);
  }
  return titles;
}
export default function transformArticlesToFrontpage(title, articles) {
  const transformed = map(articles, (article) => {
    const titles = splitTitle(article.title);
    const image = get(article, 'images.0');
    const headline = calculateFontsize(titles, image ? 'image-large' : 'large');
    return {
      title: article.title,
      titles,
      image: {
        ...image,
        imagePosition: randomImagePosition(),
      },
      headline,
    };
  });
  return {
    title,
    articles: transformed,
  };
}

function randomImagePosition() {
  return Math.random() > 0.5 ? 'left' : 'right';
}
