import React from 'react';
import _ from 'lodash';
import MainColumn from './components/main-colum';
import TopBar from './components/topbar';
import GlobalFonts from './components/util/fonts';
import Teaser from './components/teaser';
import { randomTheme } from './components/util/colors';
import calculateFontsize from './data/font-size-calculator';
import dummyData from './data/dummy.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = _.map(dummyData.articles, article =>
      calculateFontsize(article.titles),
    );
  }

  render() {
    const teasers = _.map(this.data, (item, idx) => (
      <Teaser lines={item} theme={randomTheme()} key={`teaser-${idx}`} />
    ));

    return (
      <>
        <GlobalFonts />
        <TopBar>&nbsp;</TopBar>
        <MainColumn>{teasers}</MainColumn>
      </>
    );
  }
}
