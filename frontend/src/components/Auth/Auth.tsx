import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try{
        /*
        createUsername mutation to send to the graphQL API
        */
    }catch(error){
        console.log(error)
    }
  }

  return (
    <Center height={"100vh"}>
      <Stack align="center" spacing={4}>
        {session ? (
          <>
            <Text fontSize='3xl'>Create a Username!</Text>
            <Input
              placeholder="Enter a Username 😃"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></Input>
            <Button onClick={onSubmit} width="100%">Set Username!</Button>
          </>
        ) : (
          <>
            <Text fontSize={"3xl"}>MoeChat</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  height={"20px"}
                  src={"/images/googlelogo.png"}
                  alt={"😃"}
                />
              }
            >
              Login with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
