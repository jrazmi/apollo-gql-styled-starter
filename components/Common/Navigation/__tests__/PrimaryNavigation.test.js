import { CreateMockWrapper, fakeUser } from '../../../../jest';
import { PrimaryNavigation } from '../PrimaryNavigation';
import { AccountRoutes } from '../../../../server/routes';
import { AuthenticatedUser, AnonymousUser } from '../../../../lib/models';
describe('<PrimaryNavigation />', () => {
    it('It renders a navbar component with a navbar brand', async () => {
        const wrapper = CreateMockWrapper([], <PrimaryNavigation/>);
        expect(wrapper.find('Navbar').exists()).toBe(true);
        expect(wrapper.find('NavbarBrand').exists()).toBe(true);
    });
    it("It renders a login/register link if there is no current user", async () => {
        const wrapper = CreateMockWrapper([], <PrimaryNavigation currentUser={new AnonymousUser()}/>);
        const loginLink = wrapper.find(`a[href='${AccountRoutes.login}']`);
        const regLink = wrapper.find(`a[href='${AccountRoutes.register}']`);
        expect(regLink.exists()).toBe(true);
        expect(loginLink.exists()).toBe(true);
    });
    it("It renders an account dropdown if authenticated user", async () => {
       
        const wrapper = CreateMockWrapper([], <PrimaryNavigation currentUser={new AuthenticatedUser(fakeUser())}/>);
        expect(wrapper.find('#account').exists()).toBe(true);
    })

})