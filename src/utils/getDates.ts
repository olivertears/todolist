import { IDate } from '../models/IDate';
import { translateDateToIDate } from './translateDateToIDate';

declare global {
  interface Date {
    addDays: (date: number) => Date;
  }
}

Date.prototype.addDays = function (days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getDateArray = (startDate: Date, endDate: Date): IDate[] => {
  const dateArray = [] as IDate[];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const date = translateDateToIDate(currentDate);
    dateArray.push(date);
    currentDate = currentDate.addDays(1);
  }

  return dateArray;
};
