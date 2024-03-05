const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export const humanRelativeTime = (date: Date | undefined) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "short",
  });

  // If no date is provided, return a message indicating that the date is in the past
  if (!date) return rtf.format(-7, "day");

  const now = new Date();
  const timeDifference = date.getTime() - now.getTime();

  const minutesDifference = Math.round(timeDifference / (1000 * 60));
  if (minutesDifference > -60) return rtf.format(minutesDifference, "minute");

  const hoursDifference = Math.round(timeDifference / (1000 * 60 * 60));
  if (hoursDifference > -24) return rtf.format(hoursDifference, "hour");

  const daysDifference = Math.round(timeDifference / DAY_MILLISECONDS);
  return rtf.format(daysDifference, "day");
};
