export function formatHumanReadableDate(created_at) {
  const messageDate = new Date(created_at);
  const now = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = now - messageDate;

  // Calculate the difference in days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (daysDifference < 1) {
    // Format the time for today
    return `Today at ${messageDate.toLocaleTimeString()}`;
  } else if (daysDifference < 2) {
    // Format the time for yesterday
    return `Yesterday at ${messageDate.toLocaleTimeString()}`;
  } else if (daysDifference < 7) {
    // Format the time for this week
    return `This week at ${messageDate.toLocaleTimeString()}`;
  } else {
    // Format the full date and time for other cases
    return messageDate.toLocaleString();
  }
}
