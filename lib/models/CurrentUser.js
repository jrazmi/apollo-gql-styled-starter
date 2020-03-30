import gql from 'graphql-tag';

export const CurrentUser = async (apolloClient) => {
    return await getCurrentUserSSQ(apolloClient);
}

export class AnonymousUser {
    constructor(){
        this.authenticated = false
    }
}

export class AuthenticatedUser {
    constructor(data) {
        this.authenticated = true
        this.id = data.id
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.email = data.email
    }
}

export const USER_ME_QUERY = gql`
    query userMe {
        userMe {
            id
            firstName
            lastName
            email
        }
    }
`;

export const getCurrentUserSSQ = async (apolloClient) => 
    
    apolloClient.query({
        query: USER_ME_QUERY
    })
    .then(({data}) => {
        if(data && data.userMe){
            return new AuthenticatedUser(data.userMe)
        } else {
            return new AnonymousUser()
        }
    })
    .catch((e) => {
        return new AnonymousUser()
    });


