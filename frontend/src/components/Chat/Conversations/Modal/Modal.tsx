import { useLazyQuery, useQuery } from "@apollo/client";
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
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";

import UserOperations from "../../../../graphql/operations/user";
import { SearchUsersData, SearchUsersInput } from "../../../../util/types";
import UserSearchList from "./UserSearchList";

interface ConversationModalPorps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalPorps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  console.log("Searched Users: ", data)

  const searchUser = async (event: React.FormEvent) => {
    event.preventDefault();
    //search users query
    searchUsers({ variables: { username } })
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
            { data?.searchUsers && <UserSearchList users={data.searchUsers} /> } 
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
