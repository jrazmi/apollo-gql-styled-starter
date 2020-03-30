import Link from 'next/link';
import { Nav, NavDropdown } from './Styles';

import { AccountRoutes } from '../../../server/routes';


export const PrimaryNavigationItems = ({currentUser}) => {
    if(currentUser && currentUser.authenticated){
        return (
            <Nav className="ml-auto">
                <NavDropdown id="account" title="account">
                        <Link href={`${AccountRoutes.profile}`}>
                            <Nav.Link href={`${AccountRoutes.profile}`}>
                                Profile
                            </Nav.Link>
                        </Link>
                        <Link href={`${AccountRoutes.changePassword}`}>
                            <Nav.Link href={`${AccountRoutes.changePassword}`}>
                                Change Password
                            </Nav.Link>
                        </Link>
                         <Link href={`${AccountRoutes.logout}`}>
                            <Nav.Link href={`${AccountRoutes.logout}`}>
                                Logout
                            </Nav.Link>
                        </Link>
                </NavDropdown>
            </Nav>
        )
    }
    //default to anon nav
    return(
        <Nav className="ml-auto">
            <Link href={`${AccountRoutes.login}`}>
                <Nav.Link href={`${AccountRoutes.login}`}>
                    Login
                </Nav.Link>
            </Link>
            <Link href={`${AccountRoutes.register}`}>
                <Nav.Link href={`${AccountRoutes.register}`}>
                    Register
                </Nav.Link>
            </Link>
        </Nav>
    )
}