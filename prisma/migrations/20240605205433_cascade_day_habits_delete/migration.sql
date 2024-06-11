-- DropForeignKey
ALTER TABLE "day_habits" DROP CONSTRAINT "day_habits_day_id_fkey";

-- AddForeignKey
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
