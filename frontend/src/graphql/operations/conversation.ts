import { gql } from "@apollo/client";

const CoversationFields = `
    id
    participants {
      user {
        id 
        username
      }
      hasSeenLatestMessage
    }
    lastestMessage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
    updatedAt
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {
    conversations: gql`
      query Coversations {
        conversations {
          ${CoversationFields}
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    coversationCreated: gql`
      subscription ConversationCreated {
        coversationCreated {
          ${CoversationFields}
        }
      }
    `
  },
};
