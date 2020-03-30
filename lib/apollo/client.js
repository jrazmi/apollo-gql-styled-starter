import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from "apollo-link";

import cookie from 'cookie'
import fetch from 'isomorphic-unfetch'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../server/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const getNextCookies = ctx => {
  const cookieStr = ctx && ctx.req 
    ? ctx.req.headers.cookie 
    : window.document.cookie
  return cookie.parse(cookieStr || '')
}



export default function createApolloClient(initialState, ctx) {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getNextCookies(ctx).token
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  // const enhancedFetch = (url, init) => {

  //   let token = parseCookies().token;
  //   console.log(token)
  //   if(ctx && ctx.req){
  //     token = parseCookies(ctx.req).token;
  //   }
  //   return fetch(url, {
  //     ...init,
  //     headers: {
  //       ...init.headers,
  //       authorization: token ? `Bearer ${token}` : '' 
  //     }
  //   })
  // }
    
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({fragmentMatcher}).restore(initialState),
  })
}