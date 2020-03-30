import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const FormControl = styled(Form.Control)`
    border-radius: 0px;
    border: none;
        font-family: ${props => props.theme.fonts.titleFont};
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    ${({ error, theme }) => error && `
            border-left: 3px solid ${theme.colors.error};
            border-bottom: 2px solid ${theme.colors.error};
    `};
`;