export const openLink = (url) => {
  const newWin = window.open(url, '_blank');
  if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
    return false;
  }
  return true;
};

export const formatDateRange = (startDate, endDate) => {
  // Function to add ordinal suffix to a day
  const ordinalSuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Convert string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Extract and format dates
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleString('default', { month: 'short' });
  const endMonth = end.toLocaleString('default', { month: 'short' });

  // Construct the formatted date range
  const formattedStart = `${startDay}${ordinalSuffix(startDay)} ${startMonth}`;
  const formattedEnd = `${endDay}${ordinalSuffix(endDay)} ${endMonth}`;
  return `${formattedStart} - ${formattedEnd}`;
};

export function formatWalletAddress(input, charLength = 8) {
  if (
    typeof input !== 'string' ||
    !input.startsWith('0x') ||
    input.length <= 10
  ) {
    console.warn('Invalid wallet address:', input);
    // return input; // Return the input as-is or an empty string to handle gracefully
  }

  // Extract and return the formatted string
  return `${input.slice(0, charLength)}...${input.slice(
    input.length - charLength
  )}`;
}

export function formatAddressInLeaderboard(address) {
  if (address?.length <= 10) return address; // If the address is too short, return it as is.
  const start = address?.slice(0, 10); // Take the first 10 characters.
  const end = address?.slice(-10); // Take the last 10 characters.
  return `${start}...${end}`; // Concatenate with ellipsis.
}
export const getFormattedDate = (inputDate) => {
  try {
    const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};
