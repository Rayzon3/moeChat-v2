import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";

import ConversationsList from "./ConversationList";
import CoversationOperations from "../../../graphql/operations/conversation";
import { ConversationsData } from "../../../util/types";

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
  } = useQuery<ConversationsData, null>(CoversationOperations.Queries.conversations);

  console.log("Coversations Data: ", conversationsData )

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton Loader */}
      <ConversationsList session={session} conversations={conversationsData?.conversations || []} />
    </Box>
  );
};
export default CoversationsWrapper;
