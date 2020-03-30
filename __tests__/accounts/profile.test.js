import { CreateMockWrapper } from '../../jest';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import { Profile, FormDefinition, UPDATE_USER_ME_MUTATION } from '../../pages/accounts/profile';


jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/accounts/login',
    push: jest.fn()
  })),
}));



const successMocks = [
    {
        request: {
            query: UPDATE_USER_ME_MUTATION,
            variables: {
                input: {
                    firstName: "foo",
                    lastName: "bar"
                },
            },
        },
        result: {
            data: {
                userUpdateMe: {
                    __typename: "UserUpdateMeSuccess",
                    message: "User updated.",
                    user: {
                        id: 1,
                        firstName: 'foo',
                        lastName: "bar",
                        email: "foo@bar.com"
                    }
                }
            }
        }
    }
]

const unsuccessMocks = [
    {
        request: {
            query: UPDATE_USER_ME_MUTATION,
            variables: {
                input: {
                    firstName: "foo",
                    lastName: "bar"
                },
            },
        },
        result: {
            data: {
                userUpdateMe:{
                    __typename: "UserUpdateMeError",
                    message: "Error"
                }
            }
            
        }
    }
]


describe('<Profile/>', () => {
    it('it renders a profile page with profile inputs', async () => {
        const wrapper = CreateMockWrapper([], <Profile/>);
        expect( wrapper.find('Titles__H2').text().includes('Profile')).toBe(true);
        expect(wrapper.find('input[name="firstName"]').exists()).toBe(true);
        expect(wrapper.find('input[name="lastName"]').exists()).toBe(true);
    });
    it('it submits a profile update request with status OK', async () => {
        await act( async () => {
            
            const wrapper = CreateMockWrapper(successMocks, <Profile/>);
            
            wrapper.find('input[name="firstName"]').instance().value = "foo";
            wrapper.find('input[name="lastName"]').instance().value = "bar";
       


            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const status = wrapper.find('StatusMessage');
            expect(status.find('p').text().includes('User updated.')).toBe(true);

            


        })
        
    });
    it('it returns an error message when submission was not successful', async () => {
        await act( async() => {
            const wrapper = CreateMockWrapper(unsuccessMocks, <Profile/>);

            wrapper.find('input[name="firstName"]').instance().value = "foo";
            wrapper.find('input[name="lastName"]').instance().value = "bar";

            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const error = wrapper.find('StatusMessage');
            expect(error.find('p').text().includes('Error')).toBe(true);

     
        })
    })
})