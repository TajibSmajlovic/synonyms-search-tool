import { createGlobalStyle } from 'styled-components';

import './css/css-reset.css';
import './css/css-variables.css';

const GlobalStyle = createGlobalStyle`
    body {
        color: var(--gray_700);
        background-color: var(--gray_100);
    }

    #root {
        position: relative;
        display: flex;
        flex-direction: column;
    }
`;

export default GlobalStyle;
