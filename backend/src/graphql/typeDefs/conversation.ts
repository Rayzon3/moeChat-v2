import { gql } from "apollo-server-core";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationRes
  }
  type CreateConversationRes {
    conversationId: String
  }


  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }
  type Conversation {
    id: String
    lastestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    conversations: [Conversation]
  }

  type Subscription {
    conversationCreated: Conversation
  }
`;

export default typeDefs;
