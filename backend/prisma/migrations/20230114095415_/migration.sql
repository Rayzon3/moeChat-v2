-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_latestMessageId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "latestMessageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_latestMessageId_fkey" FOREIGN KEY ("latestMessageId") REFERENCES "Message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
