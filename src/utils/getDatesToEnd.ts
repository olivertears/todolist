import { dateToString } from './dateToString';

export const getDatesToEnd = (lastDate: string): string[] => {
  const dateArray = [] as string[];
  let currentDate = new Date(lastDate).getTime() + 86400000;
  const endDate = currentDate + 86400000 * 30;

  while (currentDate < endDate) {
    dateArray.push(dateToString(currentDate));
    currentDate += 86400000;
  }

  return dateArray;
};
