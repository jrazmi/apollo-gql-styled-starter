import { Navbar, Nav } from './Styles';
import Link from 'next/link';
import { Container } from '../Grid';
import { PrimaryNavigationItems } from './PrimaryNavigationItems';

export const PrimaryNavigation = ({currentUser}) => {
    return(
        <Navbar expand="lg">
            <Container>
                <Link href="/">
                    <Navbar.Brand href="/">
                            Polaris
                    </Navbar.Brand>
                </Link>


                <Navbar.Collapse id="primary-nav" >
                    <PrimaryNavigationItems currentUser={currentUser}/>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}