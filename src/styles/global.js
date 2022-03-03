import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --primary: #ff577f;
        --primaryFocus: #ff427f;
        --primaryNegative: #59323f;
        --grey4: #121214;
        --grey3: #212529;
        --grey2: #343b41;
        --grey1: #f8f9fa;
      }
    body: {
        background: var(--grey4);
        color: var(--grey1);
    }
    body, input, button {
        font-family: 'Inter';
        font-size: 1rem;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Inter';
        font-weight: 700;
    }
    button {
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
`;