import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = new HttpLink({
    //graphQL API endPoint
    uri: 'http://localhost:4000/graphql',
    credentials: "include" // for cors
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})