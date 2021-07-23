import React from 'react';
import _ from 'lodash';
import MainColumn from './components/main-colum';
import TopBar from './components/topbar';
import GlobalFonts from './components/util/fonts';
import LargeTeaser from './components/teasers/large-teaser';
import LargeImageTeaser from './components/teasers/large-image-teaser';
import { randomTheme } from './components/util/colors';
import transformArticlesToFrontpage from './data/frontpage-data-transformer';
import rodongData from '../data/rodong.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const transformed = transformArticlesToFrontpage(
      rodongData.title,
      rodongData.topNews,
    );
    this.data = transformed.articles;
  }

  render() {
    const teasers = _.map(this.data, (item, idx) => {
      if (item.image) {
        return (
          <LargeImageTeaser
            lines={item.headline}
            theme={randomTheme()}
            key={`teaser-${idx}`}
          />
        );
      }
      return (
        <LargeTeaser
          lines={item.headline}
          theme={randomTheme()}
          key={`teaser-${idx}`}
        />
      );
    });

    return (
      <>
        <GlobalFonts />
        <TopBar>&nbsp;</TopBar>
        <MainColumn>{teasers}</MainColumn>
      </>
    );
  }
}
