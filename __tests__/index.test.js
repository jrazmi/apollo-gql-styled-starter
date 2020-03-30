import { CreateMockWrapper } from '../jest';
import { Home } from '../pages/index';
import { USER_ME_QUERY, AnonymousUser, AuthenticatedUser } from '../lib/models';

describe('<Home/>', () => {
    it('It renders a homepage component', async () => {
        const wrapper = CreateMockWrapper([], <Home/>);
        expect(wrapper.find('Home').exists()).toBe(true);
    });
    it('It renders annonymous homepage when SSQ returns anonymous user', async () => {
        /* mock an anoymous user returned by SSQ */
        const Anon = new AnonymousUser();
        const wrapper = CreateMockWrapper([], <Home currentUser={Anon}/>);
        const HomeComponent = wrapper.find('Home');
        expect(HomeComponent.props().currentUser.authenticated).toBe(false);
    });
    it('It renders an authenticated homepage when SSQ returns authed user', async () => {
        const Authed = new AuthenticatedUser({id: "asdf", firstName: "asdf"});
        const wrapper = CreateMockWrapper([], <Home currentUser={Authed}/>);
        const HomeComponent = wrapper.find('Home');
        expect(HomeComponent.props().currentUser.authenticated).toBe(true);
    });
})