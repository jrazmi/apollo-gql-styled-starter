import { CreateMockWrapper } from '../../jest';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import { Login, FormDefinition, LOGIN_USER_MUTATION } from '../../pages/accounts/login';


jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/accounts/login',
    push: jest.fn()
  })),
}));



const successMocks = [
    {
        request: {
            query: LOGIN_USER_MUTATION,
            variables: {
                input: {
                    email: "foo@bar.com",
                    password: "foobarbaz"
                },
            },
        },
        result: {
            data: {
                userLogin: {
                    __typename: "UserLoginSuccess",
                    message: "Login successful.",
                    authenticationToken: "foo"
                }
            }
        }
    }
]

const unsuccessMocks = [
    {
        request: {
            query: LOGIN_USER_MUTATION,
            variables: {
                input: {
                    email: "foo@bar.com",
                    password: "foobarbaz"
                },
            },
        },
        result: {
            data: {
                userLogin:{
                    __typename: "UserLoginError",
                    message: "Duplicate email address"
                }
            }
            
        }
    }
]


describe('<Login/>', () => {
    it('it renders a login page with login inputs', async () => {
        const wrapper = CreateMockWrapper([], <Login/>);
        expect( wrapper.find('Titles__H2').text().includes('Login')).toBe(true);
        expect(wrapper.find('input[name="email"]').exists()).toBe(true);
        expect(wrapper.find('input[name="password"]').exists()).toBe(true);
    });
    it('it submits a login request with status OK', async () => {
        await act( async () => {
            
            const wrapper = CreateMockWrapper(successMocks, <Login/>);
            
            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="password"]').instance().value = "foobarbaz";
       


            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const status = wrapper.find('StatusMessage');
            expect(status.find('p').text().includes('Login successful.')).toBe(true);

            


        })
        
    });
    it('it returns an error message when submission was not successful', async () => {
        await act( async() => {
            const wrapper = CreateMockWrapper(unsuccessMocks, <Login/>);

            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="password"]').instance().value = "foobarbaz";

            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const error = wrapper.find('StatusMessage');
            expect(error.find('p').text().includes('Duplicate email address')).toBe(true);

     
        })
    })
})