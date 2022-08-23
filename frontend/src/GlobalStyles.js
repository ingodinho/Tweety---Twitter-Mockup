import { createGlobalStyle } from "styled-components";
import SFPro from "./fonts/SF-Pro-Text-Regular.ttf";
const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'SFPro';
  src: url(${SFPro}) format("truetype");
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  
}

html {
  font-size: 62.5%;
  font-family: 'SFPro', serif;
}

html, body {
  height: 100%;
  
}

body {
  min-width: var(--min-width);
  max-width: var(--max-width);
  margin: 0 auto;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  color: var(--clr-text-prm);
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  object-fit: cover;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

/* 
===================================
  Variables
===================================*/

:root {
  --clr-blue: #1D9BF0;
  --clr-text-prm: #141619;
  --clr-text-white: #fff;
  --clr-text-grey: #687684;
  --clr-text-link: #4C9EEB;
  --clr-bg-grey: #E7ECF0;
  --clr-line-grey: #BDC5CD;
  --clr-red: #ff0e0e;
  --spacing-wrapper: 2.4rem;
  --min-width: 350px;
  --max-width: 450px;
}
`;

export default GlobalStyles;
