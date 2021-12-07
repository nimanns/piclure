export function dateAndTimeFormatter(dateAndTime: string) {
  const dateTime = new Date(dateAndTime);
  return (
    " " +
    [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ][dateTime.getMonth()] +
    " " +
    dateTime.getDate() +
    ", " +
    dateTime.getFullYear() +
    " - " +
    (dateTime.getHours() < 10
      ? "0" + dateTime.getHours()
      : dateTime.getHours()) +
    ":" +
    (dateTime.getMinutes() < 10
      ? "0" + dateTime.getMinutes()
      : dateTime.getMinutes())
  );
}
