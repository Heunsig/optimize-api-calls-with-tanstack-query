export function convertUTCToLocalTime(utcTimestamp: string): string {
  // Parse the UTC timestamp string to get the date and time components
  const [datePart, timePart] = utcTimestamp.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  // Create a Date object in UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

  // Get the local time components
  const localYear = utcDate.getFullYear();
  const localMonth = utcDate.getMonth() + 1; // Months are zero-indexed
  const localDay = utcDate.getDate();
  const localHours = utcDate.getHours();
  const localMinutes = utcDate.getMinutes();
  const localSeconds = utcDate.getSeconds();

  // Format the local date string in 'YYYY-MM-DD HH:mm:ss' format
  const localDateString = `${localYear}-${String(localMonth).padStart(2, '0')}-${String(localDay).padStart(2, '0')} ${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}:${String(localSeconds).padStart(2, '0')}`;

  return localDateString;
}