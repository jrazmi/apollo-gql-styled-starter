import styled, {css} from 'styled-components';

export const UnsavedMessage = styled('h6')`
    color: ${props => props.theme.colors.error};
    text-transform: uppercase;
    font-style: italic;
    margin-top: -5px;
    margin-bottom: 0px;
    font-family: ${props => props.theme.fonts.titleFont};
`;

const StatusContainer = styled('div')`
    padding: .5rem .75rem;
    background: white;
    margin: 2rem 0;
    p {
        margin: 0;
        font-weight: 100;
    }
    background-color: ${props => props.theme.colors.g1};
        border-left: 5px solid ${props => props.theme.colors.tertiary};
    ${props => props.error && css`
        border-left: 5px solid ${props => props.theme.colors.error};
    `}
    ${props => props.hide && css`
        display: none;
    `}
`;
export const StatusMessage = ({status}) => {
    return(
        <StatusContainer error={status.error} hide={status.hide}>
            <h3>{status.title}</h3>
            <p>{status.message}</p>
        </StatusContainer>
    )
}