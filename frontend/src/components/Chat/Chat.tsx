import { Button, Flex } from "@chakra-ui/react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import CoversationsWrapper from "./Conversations/CoversationsWrapper"
import FeedWrapper from "./Feed/FeedWrapper"

interface ChatProps {
    session: Session
}

const Chat: React.FC<ChatProps> = ({ session }) => {
    return (
        <Flex height="100vh">
            <CoversationsWrapper session={session} />
            <FeedWrapper session={session} />
        </Flex>
    )
}

export default Chat