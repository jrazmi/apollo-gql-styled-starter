import { withApollo } from "../../lib/apollo";
import _ from 'lodash';
import gql from 'graphql-tag';
import { Layout } from "../../components/Global";
import { CurrentUser } from "../../lib/models";
import { Box, Container, Row, Col } from "../../components/Common";
import { GenerateGQLForm } from "../../components/Common/Forms";


export const FormDefinition = {
    "header": {
        "title": {
            "content": "Change Password",
            "uppercase": true,
            "color": "primary",
        }
    },
    "button": {
        "color": "secondary",
        "staticName": "Update",
        "submittingName": "Updating"
    },
    "rows": [
        {
            "row": "row justify-content-center",
            "legend": {
                "content": "Current Credentials",
                "uppercase": true,
                "color": "primary"
            },
            "fields": [
                {
                "col": "col-md-12",
                "type": "email",
                "name": "email",
                "label": "Email Address",
                "placeholder": "Email Address",
                "readonly": true
                },
                {
                    "col": "col-md-12",
                    "type": "password",
                    "name": "currentPassword",
                    "validation": {
                        "required": "Current Password Required",
                        "custom": [{"name": "ValidPassword"}],
                    },
                    "label": "Current Password",
                    "placeholder": "Current Password"
                },
                
            ]
        },
        {
            "row": "row justify-content-center",
            "legend": {
                "content": "New Credentials",
                "uppercase": true,
                "color": "primary"
            },
            "fields": [
                   {
                        "col": "col-md-12",
                        "type": "password",
                        "name": "newPassword",
                        "validation": {
                                "required": "New Password Required",
                                "custom": [{"name": "ValidPassword"}],
                            },
                        "label": "New Password",
                        "placeholder": "New Password"
                    },
                    {
                        "col": "col-md-12",
                        "type": "password",
                        "name": "confirmPassword",
                        "validation": {
                                "required": "Password Required",
                                "custom": [{"name": "ValidPassword"}, {"name": "MatchesInputValue", "input": "newPassword"}],
                            },
                        "label": "Confirm Password",
                        "placeholder": "Confirm Password"
                    },
            ]
        }
    ]
}
const preparePayload = (data) => {
    return _.omit(data, ['confirmPassword']);
}

export const UPDATE_USER_CHANGE_PASSWORD = gql`
    mutation userChangePassword($input: UserChangePasswordInput!){
        userChangePassword(input: $input) {
            __typename
            ... on UserChangePasswordSuccess {
                message
                success
            }
            ... on UserChangePasswordError {
                message
            }
        }
    }
`;

// export const for tests/mocked provider
export const ChangePassword = ({ currentUser }) => {
    const requestContext = {
        'returnName': 'userChangePassword',
    }

    return (
        <Layout currentUser={currentUser}>
            <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            <GenerateGQLForm 
                                definition={FormDefinition} 
                                mutation={UPDATE_USER_CHANGE_PASSWORD}
                                preparePayload={preparePayload}
                                requestContext={requestContext}
                                initialItem={currentUser}
                            />
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

ChangePassword.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);
    console.log(currentUser)
    return { currentUser }
}

// export default for web server
export default withApollo({ssr: true})(ChangePassword);