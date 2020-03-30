import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const FormText = styled(Form.Text)`

    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
    color: ${props => props.theme.colors.error};
    font-family: ${props => props.theme.fonts.titleFont};
   
`;