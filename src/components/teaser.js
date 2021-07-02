import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { themes, colors } from './util/colors';

const TeaserWrapper = styled.div`
  background-color: ${props => props.bgColor || colors.yellow};
  color: ${props => props.textColor || colors.dark};
  width: 100%;
  border-radius: 5px;

  font-size: 13px;
  overflow-x: hidden;
  margin: 15px 0;

  &:hover: {
    box-shadow: 0 0 10px 5px #c8c8c8;
    opacity: 0.8;
  }
`;

const Headline = styled.div`
  font-family: 'Work Sans', sans-serif;
  text-align: center;
  font-weight: bold;
`;

const Line = styled.p`
  margin: 0;
  padding: 0;
  white-space: nowrap;
  font-size: ${(props) => props.emSize}em;
`;

export default class Teaser extends React.Component {
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
