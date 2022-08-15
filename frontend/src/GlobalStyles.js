import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

html, body {
  height: 100%;
}

body {
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid black;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
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

/* ===================================
  Fonts, Variables
 ===================================*/


//FIX ME --- FUCKING FONT GEHT NICHT

@font-face {
  font-family: 'SF-Pro';
  src: url('./fonts/SF-Pro-Text-Regular.otf') format("opentype");
}

body {
  font-family: 'SF-Pro', serif;
}

:root {
  --clr-blue: #1D9BF0;
  --clr-text-prm: #141619;
  --clr-text-white: #fff;
  --clr-text-grey: #687684;
  --clr-text-link: #4C9EEB;
  --clr-bg-grey: #E7ECF0;
  --clr-line-grey: #BDC5CD;
  --spacing-wrapper: 3.2rem;
}

`;

export default GlobalStyles;
