import { CreateUsernameRes, GraphQLContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameRes> => {
      const { username } = args;
      const { session, prisma } = context

      if(!session?.user) {
        return {
            error: "Not Authorized"
        }
      }

      const { id: userID } = session.user

      try {

        //check if username is taken
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if(existingUser) {
            return {
                error: "This username is already taken! 😕"
            }
        }

        //set username for user
        await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                username
            }
        })

        return { success: true }
        
      } catch (error: any) {
        console.log("createUsername Error:", error)
        return {
            error: error?.message
        }
      }

    },
  },
};

export default resolvers;
