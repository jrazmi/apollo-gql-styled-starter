import styled, { css, keyframes } from 'styled-components';
import { lighten } from 'polished';

const loadingKey = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const Button = styled("button")`
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.white};
    padding: .5rem 1rem;
    position: relative;
    text-transform: uppercase;
    border: none;
    border-radius: 0px;
    font-weight: 800;
    background-color: ${props => props.theme.colors.primary};
    margin-top: 1rem;
    margin-bottom: 1rem;
    &:hover,
    &:focus,
    &:active{
        cursor: pointer;
        background-color: ${props => props.theme.colors.primary && lighten(.1, props.theme.colors.primary)}

    }
    ${props => props.color ==='primary' && css`
         background-color: ${props => props.theme.colors.primary};
            &:hover,
            &:active,
            &:focus {
                background-color: ${props => props.theme.colors.primary && lighten(.1, props.theme.colors.primary)}

        }
    `}

    ${props => props.color ==='secondary' && css`
         background-color: ${props => props.theme.colors.secondary};
            &:hover,
            &:active,
            &:focus {
                background-color: ${props => props.theme.colors.secondary && lighten(.1, props.theme.colors.secondary)}

        }
    `}

    ${props => props.color ==='tertiary' && css`
         background-color: ${props => props.theme.colors.tertiary};
            &:hover,
            &:active,
            &:focus {
                background-color: ${props => props.theme.colors.tertiary && lighten(.1, props.theme.colors.tertiary)}

        }
    `}
    ${props => props.color !=='primary' && props.color !=='secondary' && props.color !=='tertiary' && css`
         background-color: ${props => props.color};
            &:hover,
            &:active,
            &:focus {
                background-color: ${props => props.color && lighten(.1, props.color)}

        }
    `}
    ${props => props.loading && css`
            background-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.3) 50%, transparent 100%);
            background-size: 50% auto;
            animation: ${loadingKey} 1.4s linear infinite;
            cursor: not-allowed;
            pointer-events: none;
    `}
    
/* ${({loading, theme}) => loading && css`
   
            background-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.3) 50%, transparent 100%);
            background-size: 50% auto;
            animation: ${loadingKey} 1.4s linear infinite;
        
    `} */
    
`;