import { gql } from "apollo-server-core";

const typeDefs = gql`

    type User {
        id: String
        name: String
        username: String
        email: String
        emailVerified: Boolean
        image: String
    }

    type SearchedUser {
        id: String
        username: String
    }

    type Query {
        searchUsers(username: String): [SearchedUser]
    }

    type Mutation {
        createUsername(username: String): CreateUsernameRes
    }

    type CreateUsernameRes {
        success: Boolean
        error: String
    }
`

export default typeDefs