export function getLocalISODateTime(date: Date): string {
    const timezoneOffset = +7;

    const adjustedDate = new Date(date.getTime() + (timezoneOffset * 60 * 60 * 1000));
    const isoString = adjustedDate.toISOString();
    
    return isoString.slice(0, 19);
  }
