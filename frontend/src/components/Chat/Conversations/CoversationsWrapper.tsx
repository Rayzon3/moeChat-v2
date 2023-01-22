import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";

import ConversationsList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationsData } from "../../../util/types";
import { ConversationPopulated } from "../../../../../backend/src/utils/types";
import { useEffect } from "react";

interface ConversationsWrapperProps {
  session: Session;
}

const CoversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    loading: coversationsLoading,
    error: coversationsError,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  console.log("Query Data: ", conversationsData)

  

  //fire once when component mounts
  useEffect(() => {
    subscribeToNewConversations()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("Coversations Data: ", conversationsData);

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton Loader */}
      <ConversationsList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};
export default CoversationsWrapper;
