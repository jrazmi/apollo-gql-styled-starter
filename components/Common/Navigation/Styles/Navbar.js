import styled from 'styled-components';
import BSNavbar from 'react-bootstrap/Navbar';

export const Navbar = styled(BSNavbar)`
    background-color: ${props => props.theme.colors.g3};
    margin-bottom: 0px;
    .navbar-brand {
        color: ${props => props.theme.colors.primary};
        text-transform: uppercase;
        font-weight: bold;
        font-family: ${props => props.theme.fonts.title};
    }
`;