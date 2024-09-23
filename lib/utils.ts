// Import the Ride type from the specified file
import { Ride } from "@/types/type";

/**
 * sortRides - A function that sorts an array of rides in ascending order based on their creation date and time.
 *
 * @param {Ride[]} rides - An array of Ride objects to be sorted.
 * @returns {Ride[]} - A sorted array of Ride objects with the earliest ride first.
 */
export const sortRides = (rides: Ride[]): Ride[] => {
  // Sort the rides array by converting created_at and ride_time into Date objects and comparing their timestamps.
  const result = rides.sort((a, b) => {
    const dateA = new Date(`${a.created_at}T${a.ride_time}`); // Convert the created_at and ride_time of ride A to a Date object.
    const dateB = new Date(`${b.created_at}T${b.ride_time}`); // Convert the created_at and ride_time of ride B to a Date object.

    // Compare the timestamps of dateB and dateA to sort in descending order (most recent first).
    return dateB.getTime() - dateA.getTime();
  });

  // Reverse the array to get the rides in ascending order (earliest first).
  return result.reverse();
};

/**
 * formatTime - A function that formats time in minutes into a readable format, either in minutes or hours and minutes.
 *
 * @param {number} minutes - The total time in minutes.
 * @returns {string} - A formatted string representing the time, either in "X min" or "Xh Ym" format.
 */
export function formatTime(minutes: number): string {
  // Round the minutes to the nearest integer, defaulting to 0 if input is invalid.
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  // If time is less than 60 minutes, return the time in minutes.
  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    // If time is 60 minutes or more, calculate the number of hours and the remaining minutes.
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`; // Return the time in "Xh Ym" format.
  }
}

/**
 * formatDate - A function that formats a date string into a readable "DD Month YYYY" format.
 *
 * @param {string} dateString - A string representing a date.
 * @returns {string} - A formatted date string in the form "DD Month YYYY".
 */
export function formatDate(dateString: string): string {
  // Convert the input string into a Date object.
  const date = new Date(dateString);

  // Extract the day from the Date object.
  const day = date.getDate();

  // Define an array of month names to display the month in text format.
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the name of the month using the month number from the Date object.
  const month = monthNames[date.getMonth()];

  // Extract the year from the Date object.
  const year = date.getFullYear();

  // Return the formatted date as "DD Month YYYY". If the day is less than 10, prepend a "0" for better formatting.
  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}
