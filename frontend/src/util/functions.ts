import { ParticipantPopulated } from "../../../backend/src/utils/types";

export const formatUsernames = (
  participants: Array<ParticipantPopulated>,
  myUserId: string
) => {
  const usernames = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.username);

    return usernames.join(", ")
};
