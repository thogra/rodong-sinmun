import styled from 'styled-components';
import { colors } from './util/colors';

const width = 930; // wow, cool story bro

const MainColumn = styled.div`
  width: ${width}px;
  margin: 0 auto;

  background-color: ${colors.light};
`;

export default MainColumn;
