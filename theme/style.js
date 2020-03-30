import { css } from 'styled-components';
import { Theme } from './Theme';
export const Style = css`
    body {
        background-color: ${Theme.colors.g2};
        line-height: 1.65;
        font-size: 18px;
        font-family: ${Theme.fonts.body};
    }
    *:focus {
        outline: none;
    }
    img {
        max-width: 100%;
    }
    a {
        color: ${Theme.colors.tertiary};
        text-decoration: none;
        &:hover,
        &:focus,
        &:active {
            color: ${Theme.colors.primary};
            cursor: pointer;
        }
    }
    button,
    a {
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }
    h1,h2,h3,h4,h5,h6 {
        margin: 0;
        font-family: ${Theme.fonts.title};
        font-weight: 800;
    }
    .form-control:disabled,
    .form-control[readonly]{
        background-color: ${Theme.colors.g3};
    }

`