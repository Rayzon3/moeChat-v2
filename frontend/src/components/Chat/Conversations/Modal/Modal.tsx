import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Modal,
  Stack,
  Input,
  filter,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "../../../../util/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";


interface ConversationModalPorps {
  session: Session
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalPorps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const { user: { id: userId } } = session

  const router = useRouter()

  const [username, setUsername] = useState("");

  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const searchUser = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Inside on submit: ", username);
    //search users query
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    console.log("Participant Ids: ",participantIds)
    try {
      //create conversation mutation
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if(!data?.createConversation) {
        throw new Error("Failed to created conversation!")
      }
      const { createConversation: { conversationId } } = data

      router.push({ query: { conversationId } })

      //Clear state and close model on successful creation
      setParticipants([])
      setUsername("")
      onClose()

    } catch (error: any) {
      console.log("Create Conversation Error: ", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Start Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={searchUser}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username! 😄"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Find User 🔎
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participants.length != 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={4}
                  _hover={{ bg: "brand.100" }}
                  onClick={onCreateConversation}
                  isLoading={createConversationLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
