import gql from 'graphql-tag';
import { withApollo } from '../lib/apollo';
import { CurrentUser, USER_ME_QUERY } from '../lib/models';
import { Layout } from '../components/Global';
import { useQuery } from '@apollo/react-hooks';

// export const for tests/mocked provider
export const Home = ({currentUser}) => {
    return(
        <Layout currentUser={currentUser}>
            Hi Layout
        </Layout>
    )
}

// THIS IS THE SERVER SIDE QUERY
Home.getInitialProps = async (context) => {
    const currentUser = await CurrentUser(context.apolloClient);

    return { currentUser }
}
// export default for web server
export default withApollo({ssr: true})(Home);


