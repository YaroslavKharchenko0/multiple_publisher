export const toUnixTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};
