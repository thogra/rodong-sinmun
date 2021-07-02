import _ from 'lodash';

const largeSizes = {
  '1': 20,
  '2': 20,
  '3': 19,
  '4': 18.1,
  '5': 17.9,
  '6': 15,
  '7': 12,
  '8': 12,
  '9': 11.25,
  '10': 11.25,
  '11': 10.5,
  '12': 9.5,
  '13': 9,
  '14': 8.125,
  '15': 7.875,
  '16': 6.06,
  '17': 5.5,
}

function getEmSize(part) {
  return _.get(largeSizes, `${part.length}`, 5);
}

export default function calculateFontsize(headlineParts, version='large') {
  const data = _.map(headlineParts, (part) => ({
    text: part,
    emSize: getEmSize(part),
  }));
  return data;
}
