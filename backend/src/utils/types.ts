import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth"

export interface GraphQLContext {
    session: Session | null,
    prisma: PrismaClient,
    // pubsub
}

/**
 * Users
 * */
export interface Session {
    user: User
    expires: ISODateString
}

interface User {
    id: string
    username: string
    email: string
    emailVerified: boolean
    name: string
    image: string
}

export interface CreateUsernameRes {
    success?: boolean,
    error?: string
}