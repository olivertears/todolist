import { dateToString } from './dateToString';

export const getDatesToStart = (firstDate: string): string[] => {
  const dateArray = [] as string[];
  const endDate = new Date(firstDate).getTime();
  let currentDate = endDate - 86400000 * 30;

  while (currentDate < endDate) {
    dateArray.push(dateToString(currentDate));
    currentDate += 86400000;
  }

  return dateArray;
};
