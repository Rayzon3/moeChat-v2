import { Box } from "@chakra-ui/react"
import { Session } from "next-auth"
import ConversationsList from "./ConversationList"

interface ConversationsWrapperProps {
    session: Session
}

const CoversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
    return (
        <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
            {/* Skeleton Loader */}
            <ConversationsList session={session} />
        </Box>
    )
}
export default CoversationsWrapper