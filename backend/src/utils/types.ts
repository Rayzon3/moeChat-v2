import { Prisma, PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";
import { Context } from "graphql-ws/lib/server"
import { PubSub } from "graphql-subscriptions"

import {
  conversationPopulated,
  participantPopulated,
} from "../graphql/resolvers/conversation";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub
}

/**
 * Server Config
 * **/
export interface Session {
  user: User;
  expires: ISODateString;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session
  }
}

/**
 * Users
 * */
interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
}

export interface CreateUsernameRes {
  success?: boolean;
  error?: string;
}

/**
 * Coversations
 * **/
export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;
