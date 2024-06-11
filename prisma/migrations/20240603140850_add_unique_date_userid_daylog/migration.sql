/*
  Warnings:

  - A unique constraint covering the columns `[date,user_id]` on the table `day_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "day_logs_date_user_id_key" ON "day_logs"("date", "user_id");
