-- DropForeignKey
ALTER TABLE "habit_week_days" DROP CONSTRAINT "habit_week_days_habit_id_fkey";

-- CreateTable
CREATE TABLE "habit_logs" (
    "id" TEXT NOT NULL,
    "log_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "habit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "day_logs" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "day_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "habit_week_days" ADD CONSTRAINT "habit_week_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "day_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_logs" ADD CONSTRAINT "day_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
