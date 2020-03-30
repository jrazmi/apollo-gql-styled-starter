import styled, { css } from 'styled-components';


export const H1 = styled('h1')`
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
export const H2 = styled('h2')`
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
export const H3 = styled('h3')`
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
export const H4 = styled('h4')`
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
export const H5 = styled('h5')`
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
export const H6 = styled('h6')`
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