import { CreateMockWrapper } from '../../jest';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import { Register, FormDefinition, ADD_USER_MUTATION } from '../../pages/accounts/register';


jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/accounts/register',
    push: jest.fn()
  })),
}));



const successMocks = [
    {
        request: {
            query: ADD_USER_MUTATION,
            variables: {
                input: {
                    firstName: "foo",
                    lastName: "bar",
                    email: "foo@bar.com",
                    password: "foobarbaz"
                },
            },
        },
        result: {
            data: {
                userAdd: {
                    __typename: "UserAddSuccess",
                    message: "User has been added / registered.",
                    user: {
                        id: 1,
                        firstName: "foo",
                        lastName: "bar",
                        email: "foo@bar.com",
                        twoFactorEnabled: false,
                        role: ['USER']
                    }
                }
            }
        }
    }
]

const unsuccessMocks = [
    {
        request: {
            query: ADD_USER_MUTATION,
            variables: {
                input: {
                    firstName: "foo",
                    lastName: "bar",
                    email: "foo@bar.com",
                    password: "foobarbaz"
                },
            },
        },
        result: {
            data: {
                userAdd:{
                    __typename: "UserAddError",
                    message: "Duplicate email address"
                }
            }
            
        }
    }
]


describe('<Register/>', () => {
    it('it renders a registration page with registration inputs', async () => {
        const wrapper = CreateMockWrapper([], <Register/>);
        expect( wrapper.find('Titles__H2').text().includes('Register')).toBe(true);
        expect(wrapper.find('input[name="firstName"]').exists()).toBe(true);
        expect(wrapper.find('input[name="lastName"]').exists()).toBe(true);
        expect(wrapper.find('input[name="email"]').exists()).toBe(true);
        expect(wrapper.find('input[name="confirmEmail"]').exists()).toBe(true);
        expect(wrapper.find('input[name="password"]').exists()).toBe(true);
        expect(wrapper.find('input[name="confirmPassword"]').exists()).toBe(true);
    });
    it('it submits a registration request with status OK', async () => {
        await act( async () => {
            
            const wrapper = CreateMockWrapper(successMocks, <Register/>);
            
            wrapper.find('input[name="firstName"]').instance().value = "foo";
            wrapper.find('input[name="lastName"]').instance().value = "bar";
            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="confirmEmail"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="password"]').instance().value = "foobarbaz";
            wrapper.find('input[name="confirmPassword"]').instance().value = "foobarbaz";


            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const status = wrapper.find('StatusMessage');
            expect(status.find('p').text().includes('User has been added / registered.')).toBe(true);


        })
        
    });
    it('it returns an error message when submission was not successful', async () => {
        await act( async() => {
            const wrapper = CreateMockWrapper(unsuccessMocks, <Register/>);
            wrapper.find('input[name="firstName"]').instance().value = "foo";
            wrapper.find('input[name="lastName"]').instance().value = "bar";
            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="confirmEmail"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="password"]').instance().value = "foobarbaz";
            wrapper.find('input[name="confirmPassword"]').instance().value = "foobarbaz";

            wrapper.find('form').simulate('submit');
            await wait(500);
            wrapper.update();
            const error = wrapper.find('StatusMessage');
            expect(error.find('h3').text().includes('Uh Oh')).toBe(true);
            expect(error.find('p').text().includes('Duplicate email address')).toBe(true);

     
        })
    })
})