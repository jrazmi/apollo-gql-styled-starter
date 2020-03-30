import styled, { css } from 'styled-components';


export const Legend = styled('legend')`
    font-size: .8rem;
    border-bottom: 2px solid ${props => props.theme.colors.g2};
    margin-top: 1rem;
    margin-bottom: -.75rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};
    ${props => props.color ==='primary' && css`
        color: ${props => props.theme.colors.primary};
    `}
    ${props => props.color ==='secondary' && css`
        color: ${props => props.theme.colors.secondary};
    `}
    ${props => props.color ==='tertiary' && css`
        color: ${props => props.theme.colors.tertiary};
    `}
    ${props => props.color !=='primary' && props.color !== 'secondary' && props.color !== 'tertiary' && css`
        color: ${props => props.color};
    `}
`;