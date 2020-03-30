import { withApollo } from "../../lib/apollo";
import gql from 'graphql-tag';
import { Layout } from "../../components/Global";
import { CurrentUser } from "../../lib/models";
import { Box, Container, Row, Col } from "../../components/Common";
import { GenerateGQLForm } from "../../components/Common/Forms";
import { AccountRoutes } from "../../server/routes";


export const FormDefinition = {
    "header": {
        "title": {
            "content": "Forgot Password",
            "uppercase": true,
            "color": "primary",
        },
    },
     "button": {
        "color": "secondary",
        "staticName": "Request Reset",
        "submittingName": "Requesting"
    },
    "rows": [
        {
            "row": "row justify-content-center",
            "fields": [
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
                }
            ]
        }
    ]
}

export const USER_REQUEST_PASSWORD_RESET = gql`
    mutation userForgotPassword($input: UserForgotPasswordInput!){
        userForgotPassword(input: $input){
            __typename
            ... on UserForgotPasswordSuccess {
                message
            }
          
        }
    }
`;

export const ForgotPassword = ({currentUser}) => {
    const requestContext = {
        'returnName': 'userForgotPassword',
        'returnItem': 'message'
    }
    return(
        <Layout currentUser={currentUser}>
            <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            <GenerateGQLForm 
                                definition={FormDefinition} 
                                mutation={USER_REQUEST_PASSWORD_RESET}
                                requestContext={requestContext}
                            />
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

ForgotPassword.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);
    return { currentUser }
}

// export default for web server
export default withApollo({ssr: true})(ForgotPassword);