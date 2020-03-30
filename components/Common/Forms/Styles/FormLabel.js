import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const FormLabel = styled(Form.Label)`
    text-transform: uppercase;
    font-size:.75rem;
    margin-bottom: 0;
    padding-left: .5rem;
    font-weight: bold;
    font-family: ${props => props.theme.fonts.titleFont};
`;