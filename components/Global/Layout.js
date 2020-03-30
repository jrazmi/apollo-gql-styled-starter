import { PrimaryNavigation } from '../Common/Navigation';
import { Footer } from './Footer';

export const Layout = ({currentUser, children}) => {
    return(
        <>
            <header>
            <PrimaryNavigation currentUser={currentUser}/>
            </header>
            <main>
                {children}
            </main>
            <Footer currentUser={currentUser}/>
        </>
    )
}