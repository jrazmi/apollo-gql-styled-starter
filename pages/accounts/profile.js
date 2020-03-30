import { withApollo } from "../../lib/apollo";
import gql from 'graphql-tag';
import { Layout } from "../../components/Global";
import { CurrentUser } from "../../lib/models";
import { Box, Container, Row, Col } from "../../components/Common";
import { GenerateGQLForm } from "../../components/Common/Forms";


export const FormDefinition = {
    "header": {
        "title": {
            "content": "Profile",
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
            "fields": [
                {
                    "col": "col-md-12",
                    "type": "text",
                    "name": "firstName",
                    "validation": {"required": "First Name Required"},
                    "label": "First Name",
                    "placeholder": "First Name"
                },
                {
                    "col": "col-md-12",
                    "type": "text",
                    "name": "lastName",
                    "validation": {"required": "Last Name Required"},
                    "label": "Last Name",
                    "placeholder": "Last Name"
                },
            ]
        }
    ]
}

export const UPDATE_USER_ME_MUTATION = gql`
    mutation userUpdateMe($input: UserUpdateMeInput!){
        userUpdateMe(input: $input) {
            __typename
            ... on UserUpdateMeSuccess {
                message
                user {
                    id
                    firstName
                    lastName
                }
            }
            ... on UserUpdateMeError {
                message
            }
        }
    }
`;

// export const for tests/mocked provider
export const Profile = ({ currentUser }) => {
    const requestContext = {
        'returnName': 'userUpdateMe',
        'returnItem': 'User'
    }

    return (
        <Layout currentUser={currentUser}>
            <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            <GenerateGQLForm 
                                definition={FormDefinition} 
                                mutation={UPDATE_USER_ME_MUTATION}
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

Profile.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);
    console.log(currentUser)
    return { currentUser }
}

// export default for web server
export default withApollo({ssr: true})(Profile);