import { Box } from "@chakra-ui/react"
import { NextPageContext } from "next"
import { signIn, useSession, signOut, getSession } from "next-auth/react"
import Chat from "../components/Chat/Chat"
import Auth from "../components/Auth/Auth"

export default function Home() {

  const { data: session } = useSession()

  console.log("session: ", session)

  const reloadSession = () => {
    const event = new Event("visibilitychange")
    document.dispatchEvent(event)
  }

  return (
    <Box>
      {
        session?.user.username ? <Chat /> : <Auth session={session} reloadSession={reloadSession} />
      }
    </Box>
  )
}

//ssr
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}