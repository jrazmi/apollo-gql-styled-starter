import styled, { css } from 'styled-components';


export const Anchor = styled('a')`
      color: ${props => props.theme.colors.tertiary};
        text-decoration: none;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
`;