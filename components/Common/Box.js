import styled from "styled-components";

const BoxContainer = styled('div')`
    padding: 1rem;
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.g1};
    border-bottom: 1px solid ${props =>props.theme.colors.g2};
    box-shadow: 0px 2px 2px 0px ${props => props.theme.colors.g3};
`;

export const Box = ({children, className}) => {
    return(
        <BoxContainer className={className}>
            {children}
        </BoxContainer>
    )
}