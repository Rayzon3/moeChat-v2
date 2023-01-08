import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import userOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  console.log("Data: ", data, loading, error);

  const onSubmit = async () => {
    if (!username) return;
    try {
      /*
        createUsername mutation to send to the graphQL API
        */
      const { data } = await createUsername({
        variables: { username },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success("Username successfully set! 😃")

      //reload session
      reloadSession()
    } catch (error: any) {
      toast.error(error.message)
      console.log(error);
    }
  };

  return (
    <Center height={"100vh"}>
      <Stack align="center" spacing={4}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username!</Text>
            <Input
              placeholder="Enter a Username 😃"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></Input>
            <Button onClick={onSubmit} width="100%" isLoading={loading}>
              Set Username!
            </Button>
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
