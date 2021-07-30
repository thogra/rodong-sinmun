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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default class LargeImageTeaser extends React.Component {
  render() {
    const theme = _.get(themes, this.props.theme, themes.yellow);
    const lines = this.props.lines.map((line, idx) => (
      <Line key={`line-${idx}`} emSize={line.emSize}>{line.text}</Line>
    ));

    const image = _.get(this.props, 'image');
    const imagePosition = _.get(this.props, 'image.imagePosition', 'left');

    const ImageWrapper = styled.div`
      min-width: ${image.width / 2}px;
      max-width: ${image.width}px;
      flex: auto;
      overflow: hidden;
    `;

    const BgImage = styled.div`
    background-image: url(data:image/jpeg;base64,${image.dataUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: #ccc;
    transform: scale(1.2);
    height: 100%;
    `;

    return (
      <TeaserWrapper bgColor={theme.bgColor} textColor={theme.textColor}>
        <Container>
          { imagePosition === 'left' && <ImageWrapper><BgImage src={image.href}>&nbsp;</BgImage>
          </ImageWrapper>  }
          <Headline>{lines}</Headline>
          { imagePosition === 'right' && <ImageWrapper><BgImage src={image.href}>&nbsp;</BgImage>
          </ImageWrapper>  }
        </Container>
      </TeaserWrapper>
    );
  }
}
