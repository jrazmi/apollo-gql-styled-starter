import { CreateMockWrapper } from '../../jest';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import { ChangePassword, FormDefinition, UPDATE_USER_CHANGE_PASSWORD } from '../../pages/accounts/change-password';


jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/accounts/login',
    push: jest.fn()
  })),
}));



const successMocks = [
    {
        request: {
            query: UPDATE_USER_CHANGE_PASSWORD,
            variables: {
                input: {
                    email: "foo@bar.com",
                    currentPassword: "foobarbaz",
                    newPassword: "barbazbuzz"
                },
            },
        },
        result: {
            data: {
                userChangePassword: {
                    __typename: "UserChangePasswordSuccess",
                    message: "Password updated.",
                    success: true
                }
            }
        }
    }
]

const unsuccessMocks = [
    {
        request: {
            query: UPDATE_USER_CHANGE_PASSWORD,
            variables: {
                input: {
                    email: "foo@bar.com",
                    currentPassword: "foobarbaz",
                    newPassword: "barbazbuzz"
                },
            },
        },
        result: {
            data: {
                userChangePassword:{
                    __typename: "UserChangePasswordError",
                    message: "Error"
                }
            }
            
        }
    }
]


describe('<ChangePassword/>', () => {
    it('it renders a change password page with change password inputs', async () => {
        const wrapper = CreateMockWrapper([], <ChangePassword/>);
        expect( wrapper.find('Titles__H2').text().includes('Change Password')).toBe(true);
        expect(wrapper.find('input[name="email"]').exists()).toBe(true);
        expect(wrapper.find('input[name="currentPassword"]').exists()).toBe(true);
        expect(wrapper.find('input[name="newPassword"]').exists()).toBe(true);
        expect(wrapper.find('input[name="confirmPassword"]').exists()).toBe(true);
    });
    it('it submits a change password update request with status OK', async () => {
        await act( async () => {
            
            const wrapper = CreateMockWrapper(successMocks, <ChangePassword/>);
            
            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="currentPassword"]').instance().value = "foobarbaz";
            wrapper.find('input[name="newPassword"]').instance().value = "barbazbuzz";
            wrapper.find('input[name="confirmPassword"]').instance().value = "barbazbuzz";
       


            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const status = wrapper.find('StatusMessage');
            expect(status.find('p').text().includes('Password updated.')).toBe(true);

            


        })
        
    });
    it('it returns an error message when submission was not successful', async () => {
        await act( async() => {
            const wrapper = CreateMockWrapper(unsuccessMocks, <ChangePassword/>);

            wrapper.find('input[name="email"]').instance().value = "foo@bar.com";
            wrapper.find('input[name="currentPassword"]').instance().value = "foobarbaz";
            wrapper.find('input[name="newPassword"]').instance().value = "barbazbuzz";
            wrapper.find('input[name="confirmPassword"]').instance().value = "barbazbuzz";
       


            wrapper.find('form').simulate('submit');
            await wait(100);
            wrapper.update();
            const error = wrapper.find('StatusMessage');
            expect(error.find('p').text().includes('Error')).toBe(true);

     
        })
    })
})