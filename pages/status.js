import gql from 'graphql-tag';
import { withApollo } from '../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

export const GET_STATUS = gql`
    query status {
        status
    }
`;
// export const for tests/mocked provider
export const Status = () => {
    const { loading, error, data } = useQuery(GET_STATUS);
    if (loading) return (
        <span className="loading">Loading...</span>
    );
    if (error) return (
                <span className="error"> 
                {error.message}
                </span>

    );
    return(
        <span className="status">
            Status: {data && data.status && <small>{data.status}</small>}
        </span>
    )
}

Status.getInitialProps = async (context) => {
    
}
// export default for web server
export default withApollo({ssr: true})(Status);
