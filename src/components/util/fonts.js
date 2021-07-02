import { createGlobalStyle } from 'styled-components';
import WorkSansBold from '../../../assets/fonts/WorkSans-Bold.woff2';
import WorkSansSemiBold from '../../../assets/fonts/WorkSans-SemiBold.woff2';

export default createGlobalStyle`
    @font-face {
      font-family: "Work Sans";
      font-weight: bold;
      src: url(${WorkSansBold}) format('woff2')
    }

    @font-face {
      font-family: "Work Sans";
      font-weight: light;
      src: url(${WorkSansSemiBold}) format('woff2')
    }


`;