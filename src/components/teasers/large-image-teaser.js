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

const ImageWrapper = styled.div`
  background-color: #ccc;
  width: 600px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default class LargeTeaser extends React.Component {
  render() {
    const theme = _.get(themes, this.props.theme, themes.yellow);
    const lines = this.props.lines.map((line, idx) => (
      <Line key={`line-${idx}`} emSize={line.emSize}>{line.text}</Line>
    ));

    const imagePos = _.get(this.props, 'imagePosition', 'left');

    return (
      <TeaserWrapper bgColor={theme.bgColor} textColor={theme.textColor}>
        <Container>
          { imagePos === 'left' && <ImageWrapper />  }
          <Headline>{lines}</Headline>
          { imagePos === 'right' && <ImageWrapper />  }
        </Container>
      </TeaserWrapper>
    );
  }
}
