import { CreateMockWrapper } from '../../../../jest';
import { GenerateGQLForm } from '../GenerateGQLForm';
import gql from 'graphql-tag';
import wait from 'waait';
import { act } from 'react-dom/test-utils';


const FOO_MUTATION = gql`
    mutation foo($input: fooInput!) {
        foo(input: $input){
            code
            success
        }
    }
`;


describe('<GenerateGQLForm/>', () => {
    it('It renders a submit button', async () => {
        const wrapper = CreateMockWrapper([], <GenerateGQLForm
            mutation={FOO_MUTATION}
        />);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });
    it('It renders a title when defined in header form definition with appropriate props', async () => {
        const FormDefinition = {
             "header": {
                "title": {
                    "content": "Foo",
                    "uppercase": true,
                    "color": "secondary",
                }
            }
        }
        const wrapper = CreateMockWrapper([], <GenerateGQLForm
            mutation={FOO_MUTATION}
            definition={FormDefinition}
        />);
        const title = wrapper.find('Titles__H2')
        expect(title.exists()).toBe(true);
        expect(title.prop('uppercase')).toBe(true);
        expect(title.prop('color')).toBe('secondary');
        expect(title.text().includes('Foo')).toBe(true);

    });
    it('It renders multiple fieldsets when defined', async () => {
        const FormDefinition = {
                        "rows": [
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                {
                                    "col": "col-md-6",
                                    "type": "text",
                                    "name": "firstName",
                                    "validation": {"required": "First Name Required"},
                                    "label": "First Name",
                                    "placeholder": "First Name"
                                }
                            ]
                        },
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                {
                                    "col": "col-md-6",
                                    "type": "text",
                                    "name": "lastName",
                                    "validation": {"required": "Last Name Required"},
                                    "label": "Last Name",
                                    "placeholder": "Last Name"
                                }
                            ]
                        }
                    ]
            }
            const wrapper = CreateMockWrapper([], <GenerateGQLForm
                mutation={FOO_MUTATION}
                definition={FormDefinition}
            />);

            const fieldsets = wrapper.find('fieldset');
            expect(fieldsets).toHaveLength(2);

    });
        it('It renders an error on submission when field is required', async () => {
        const testDef = {
                        "rows": [
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                {
                                    "col": "col-md-6",
                                    "type": "text",
                                    "name": "firstName",
                                    "validation": {"required": "First Name Required"},
                                    "label": "First Name",
                                    "placeholder": "First Name"
                                }
                            ]
                        }
                    ]
            }
        await act( async () => {
            const wrapper = CreateMockWrapper([], <GenerateGQLForm
                mutation={FOO_MUTATION}
                definition={testDef}
            />);

            const form = wrapper.find('form');
            form.simulate('submit');
            await wait();
            wrapper.update();
            const formText = wrapper.find('.form-text');
            expect(formText.text().includes('First Name Required')).toBe(true);

        })
    })
    it('It renders error on valid email validation', async () => {
        const FormDefinition = {
                        "rows": [
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                {
                                    "col": "col-md-6",
                                    "type": "email",
                                    "name": "email",
                                    "validation": {
                                        "required": "Email Required",
                                        "custom": [{"name": "ValidEmail"}],
                                    },
                                    "label": "Email",
                                    "placeholder": "Email"
                                }
                            ]
                        }
                    ]
            }
        await act( async () => {
            const wrapper = CreateMockWrapper([], <GenerateGQLForm
                mutation={FOO_MUTATION}
                definition={FormDefinition}
            />);

            wrapper.find('input[name="email"]').instance().value = "foo";
            wrapper.find('form').simulate('submit');
            await wait();
            wrapper.update();
            expect(wrapper.find('.form-text').text().includes('Invalid Email')).toBe(true);
        });

    });
        it('It renders error on valid password validation', async () => {
        const FormDefinition = {
                        "rows": [
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                 {
                                    "col": "col-md-12",
                                    "type": "password",
                                    "name": "password",
                                    "validation": {
                                            "required": "Password Required",
                                            "custom": [{"name": "ValidPassword"}],
                                        },
                                    "label": "Password",
                                    "placeholder": "Password"
                                },
                            ]
                        }
                    ]
            }
        await act( async () => {
            const wrapper = CreateMockWrapper([], <GenerateGQLForm
                mutation={FOO_MUTATION}
                definition={FormDefinition}
            />);

            wrapper.find('input[name="password"]').instance().value = "foo";
            wrapper.find('form').simulate('submit');
            await wait();
            wrapper.update();
            expect(wrapper.find('.form-text').text().includes('Must be at least 8 characters')).toBe(true);
        });

    });
    
    it('It renders error matching value error', async () => {
        const FormDefinition = {
                        "rows": [
                        {

                            "row": "row justify-content-center",
                            "fields": [
                                 {
                                    "col": "col-md-12",
                                    "type": "password",
                                    "name": "password",
                                    "validation": {
                                            "required": "Password Required",
                                            "custom": [{"name": "ValidPassword"}],
                                        },
                                    "label": "Password",
                                    "placeholder": "Password"
                                },
                                {
                                    "col": "col-md-12",
                                    "type": "password",
                                    "name": "confirmPassword",
                                    "validation": {
                                            "required": "Password Required",
                                            "custom": [{"name": "ValidPassword"}, {"name": "MatchesInputValue", "input": "password"}],
                                        },
                                    "label": "Confirm Password",
                                    "placeholder": "Confirm Password"
                                },
                            ]
                        }
                    ]
            }
        await act( async () => {
            const wrapper = CreateMockWrapper([], <GenerateGQLForm
                mutation={FOO_MUTATION}
                definition={FormDefinition}
            />);

            wrapper.find('input[name="password"]').instance().value = "foobarbaz";
            wrapper.find('input[name="confirmPassword"]').instance().value = "foobarbuz";

            wrapper.find('form').simulate('submit');
            await wait();
            wrapper.update();
            expect(wrapper.find('.form-text').text().includes('Must match password field')).toBe(true);
        });

    })


})