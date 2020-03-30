import { withApollo } from '../../lib/apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from "../../components/Global";
import { CurrentUser } from "../../lib/models";
import { Box, Container, Row, Col } from "../../components/Common";
import { LoginForm } from "../../components/Accounts/LoginForm";
import { AccountRoutes } from '../../server/routes';
import { Anchor } from '../../components/Common/Typography';

export let FormDefinition = {
    "redirect": "/",
    "header": {
        "title": {
            "content": "Login",
            "uppercase": true,
            "color": "primary"
        }
    },
     "button": {
        "color": "secondary",
        "staticName": "Login",
        "submittingName": "Logging In"
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
                }
            ]
        }
    ]
}

export const LOGIN_USER_MUTATION = gql`
    mutation userLogin($input: UserLoginInput!){
        userLogin(input: $input){
            ... on UserLoginSuccess {
                message
                authenticationToken
            }
            ... on UserLoginError {
                message
            }
        }
    }
`;


export const Login = ({currentUser }) => {
    const router = useRouter()

    const requestContext = {
        'returnName': 'userLogin',
        'returnItem': 'authenticationToken'
    }
    if(router && router.query && router.query.next){
        FormDefinition.redirect = router.query.next;
    }


    return(
        <Layout currentUser={currentUser}>
            <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            <LoginForm 
                                definition={FormDefinition} 
                                mutation={LOGIN_USER_MUTATION}
                                requestContext={requestContext}
                            />
                            <Link href={`${AccountRoutes.forgotPassword}`}>
                                <Anchor href={`${AccountRoutes.forgotPassword}`}>
                                    Forgot Password?
                                </Anchor>
                            </Link>
                        </Box>
                        
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

Login.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);
    return { currentUser }
}

export default withApollo({ssr: true})(Login);