import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { CreateUsernameRes, GraphQLContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new ApolloError("Not Authorized!");
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: searchedUsername,
                    not: myUsername,
                    mode: "insensitive"
                }
            }
        })

        return users
      } catch (error: any) {
        console.log("Search user error: ", error)
        throw new ApolloError(error.message)
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameRes> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not Authorized",
        };
      }

      const { id: userID } = session.user;

      try {
        //check if username is taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: "This username is already taken! 😕",
          };
        }

        //set username for user
        await prisma.user.update({
          where: {
            id: userID,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("createUsername Error:", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
