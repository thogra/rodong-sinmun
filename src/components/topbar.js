import styled from 'styled-components';

const TopBar = styled.div`

  position: sticky;
  top: 0;
  z-index: 1000002;

  width: 100%;
  background-color: #fff;
  height: 65px;
  border-color: #efefef;
  border-bottom: 2px;
  filter: drop-shadow(2px 4px 3px #aaa);
`;

export default TopBar;
