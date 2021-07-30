import { map, get, words, reverse, isUndefined, slice, find } from 'lodash';

import calculateFontsize from './font-size-calculator';

function limitSize(parts, options) {
  return slice(parts, 0, options?.wordCount || 5);
}

export function splitTitle(
  title,
  options = { maxLength: 20, shorten: undefined },
) {
  const { maxLength, shorten } = options;
  const splitTitle = words(title);
  const titleParts = reverse(
    shorten ? limitSize(splitTitle, shorten): splitTitle,
  );
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

export default function transformArticlesToFrontpage(
  title,
  articles,
  options = { shortenPositions: [] },
) {
  const transformed = map(articles, (article, idx) => {
    const shorten = find(options?.shortenPositions, ['position', idx]);
    const titles = splitTitle(article.title, {
      maxLength: 20,
      shorten,
    });
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
