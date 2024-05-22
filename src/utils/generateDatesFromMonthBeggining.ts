import dayjs from "dayjs";

export function generateDatesFromMonthBegining(date: string) {
  const firstDayOfTheMonth = dayjs(date).startOf("month");

  const firstDayOfNextMonth = firstDayOfTheMonth.add(1, "month").endOf("week");
  const dates = [];
  let compareDate = firstDayOfTheMonth.subtract(
    firstDayOfTheMonth.day(),
    "day"
  );

  if (dayjs(date).month() === dayjs().month()) {
    while (compareDate.isBefore(firstDayOfNextMonth)) {
      dates.push(compareDate.toDate());
      compareDate = compareDate.add(1, "day"); // caralho! genial
    }
  } else {
    while (compareDate.isBefore(firstDayOfNextMonth)) {
      dates.push(compareDate.toDate());
      compareDate = compareDate.add(1, "day");
    }
  }

  return dates;
}
