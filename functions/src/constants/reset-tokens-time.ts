/* eslint-disable max-len */

//* Docs for DELAY_TO_CHECK_USERS_TOKENS value
// The first field represents minutes, and * stands for "every value".
// The second field represents hours, and again * denotes "every value".
// The third field represents days of the month, and * indicates "every value".
// The fourth field represents months, and once more * represents "every value".
// The fifth field represents weekdays, and * signifies "every value".

// If env - Prod -> every day
// If env - Dev -> every minute (but it does not need or does not work)
export const DELAY_TO_CHECK_USERS_TOKENS =
  process.env.NODE_ENV === "production" ? "0 0 * * *" : "* * * * *";
