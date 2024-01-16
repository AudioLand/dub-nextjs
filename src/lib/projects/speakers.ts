const MAX_COUNT_OF_SPEAKERS = 10;

const numbers = Array.from({ length: MAX_COUNT_OF_SPEAKERS }, (_, index) => `${index + 1}`);

export const SPEAKERS_COUNT_LIST = ["Autodetect", ...numbers];
