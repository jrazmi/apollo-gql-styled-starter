import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { withApollo } from '../../lib/apollo';
import { Layout } from '../../components/Global';
import { useQuery } from '@apollo/react-hooks';
import { destroyCookie, parseCookies } from 'nookies'
import { Box, Container, Row, Col } from "../../components/Common";
import { AccountRoutes } from '../../server/routes';

// export const for tests/mocked provider
export const Logout = ({cookies}) => {
    const client = useApolloClient()
    const router = useRouter()
    React.useEffect(() => {
        destroyCookie(null, 'token');
        client.resetStore().then(() => {
            window.location.href = `${AccountRoutes.login}`;
        })
    }, [client])
    return(
        <Layout currentUser={null}>
             <Container>
                <Row bsPrefix={"row justify-content-center my-4"}>
                    <Col md={6}>
                        <Box>
                            Signing Out...
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

// THIS IS THE SERVER SIDE QUERY
Logout.getInitialProps = async (context) => {
    destroyCookie(context, 'token');
    const cookies = parseCookies(context);
    return { cookies };
}
// export default for web server
export default withApollo({ssr: true})(Logout);
