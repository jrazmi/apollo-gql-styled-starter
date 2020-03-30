import BSNavDropdown from 'react-bootstrap/NavDropdown'
import styled from 'styled-components';
export const NavDropdown = styled(BSNavDropdown)`
    .dropdown-menu {
        left: auto !important;
        right: 0;
        top: 58px;
        border-radius: 0px;
        border: none;
        background-color: ${props => props.theme.colors.g3};
    }
    .dropdown-item {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.tertiary} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.secondary} !important;
            cursor: pointer;
            background-color: ${props => props.theme.colors.g3};
        }
    }
`;