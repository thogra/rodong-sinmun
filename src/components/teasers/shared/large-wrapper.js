import styled from 'styled-components';

import { colors } from '../../util/colors';

const TeaserWrapper = styled.div`
  background-color: ${(props) => props.bgColor || colors.yellow};
  color: ${(props) => props.textColor || colors.dark};
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
export default TeaserWrapper;
