import { dateToString } from './dateToString';

export const getDateArray = (startDate: number, endDate: number): string[] => {
  const dateArray = [] as string[];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dateArray.push(dateToString(currentDate));
    currentDate += 86400000;
  }

  return dateArray;
};
