import _ from 'lodash';

export const colors = {
  purple: '#51208c',
  green: '#029e5d',
  yellow: '#ffff00',
  orange: '#e96c0d',
  blue: '#1058c2',
  light: '#fff',
  dark: '#000',

};

export const themes = {
  yellow: {
    bgColor: colors.yellow,
    textColor: colors.dark,
  },
  purple: {
    bgColor: colors.purple,
    textColor: colors.light,
  },
  green: {
    bgColor: colors.green,
    textColor: colors.light,
  },
  blue: {
    bgColor: colors.blue,
    textColor: colors.light,
  },
  black: {
    bgColor: colors.dark,
    textColor: colors.light,
  },
  white: {
    bgColor: colors.light,
    textColor: colors.dark,
  },
  orange: {
    bgColor: colors.orange,
    textColor: colors.light,
  },
}

export function randomTheme() {
  return _.head(_.shuffle(_.toPairs(themes)))[0];
}
