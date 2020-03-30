import { withApollo } from "../../lib/apollo";
import gql from 'graphql-tag';
import _ from 'lodash';
import { Layout } from "../../components/Global";
import { CurrentUser } from "../../lib/models";
import { Box, Container, Row, Col } from "../../components/Common";
import { GenerateGQLForm } from "../../components/Common/Forms";
import { AccountRoutes } from "../../server/routes";

export const FormDefinition = {
    "redirect": `${AccountRoutes.login}`,
    "header": {
        "title": {
            "content": "Register",
            "uppercase": true,
            "color": "primary",
        }
    },
    "button": {
        "color": "secondary",
        "staticName": "Register",
        "submittingName": "Registering"
    },
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
            },
            {
                "col": "col-md-6",
                "type": "text",
                "name": "lastName",
                "validation": {"required": "Last Name Required"},
                "label": "Last Name",
                "placeholder": "Last Name"
            },
            {
                "col": "col-md-12",
                "type": "email",
                "name": "email",
                "validation": {
                        "required": "Email Required",
                        "custom": [{"name": "ValidEmail"}],
                    },
                "label": "Email Address",
                "placeholder": "Email Address"
            },
            {
                "col": "col-md-12",
                "type": "email",
                "name": "confirmEmail",
                "validation": {
                        "required": "Email Required",
                        "custom": [{"name": "ValidEmail"}, {"name": "MatchesInputValue", "input": "email"}],
                    },
                "label": "Confirm Email Address",
                "placeholder": "Confirm Email Address",
                "supressSubmission": true
            },
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

export const ADD_USER_MUTATION = gql`
    mutation userAdd($input: UserAddInput!) {
        userAdd(input: $input){
            __typename
            ... on UserAddError {
                message
            }
            ... on UserAddSuccess {
                user {
                    id
                    email
                    firstName
                    lastName
                }
            }
        }
    }
`;


const prepareRegistrationPayload = (data) => {
    return _.omit(data, ['confirmEmail', 'confirmPassword']);
}


// export const for tests/mocked provider
export const Register = ({currentUser}) => {
    const requestContext = {
        'returnName': 'userAdd',
        'returnItem': 'User'
    }
    return(
        <Layout currentUser={currentUser}>
            <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            <GenerateGQLForm 
                                definition={FormDefinition} 
                                mutation={ADD_USER_MUTATION}
                                preparePayload={prepareRegistrationPayload}
                                requestContext={requestContext}
                            />
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

Register.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);
    return { currentUser }
}

// export default for web server
export default withApollo({ssr: true})(Register);