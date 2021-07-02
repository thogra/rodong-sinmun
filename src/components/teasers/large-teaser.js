import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { themes } from '../util/colors';
import TeaserWrapper from './shared/large-wrapper';
import Line from './shared/headline-line';


const Headline = styled.div`
  font-family: 'Work Sans', sans-serif;
  text-align: center;
  font-weight: bold;
`;

export default class LargeTeaser extends React.Component {
  render() {
    const theme = _.get(themes, this.props.theme, themes.yellow);
    const lines = this.props.lines.map((line, idx) => (
      <Line key={`line-${idx}`} emSize={line.emSize}>{line.text}</Line>
    ));
    return (
      <TeaserWrapper bgColor={theme.bgColor} textColor={theme.textColor}>
        <Headline>{lines}</Headline>
      </TeaserWrapper>
    );
  }
}
