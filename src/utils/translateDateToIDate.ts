import { IDate } from '../models/IDate';
import { months, weekDays } from '../consts';

export const translateDateToIDate = (date: Date): IDate => ({
  year: date.getFullYear(),
  month: months[date.getMonth()],
  day: date.getDate(),
  weekDay: weekDays[date.getDay()],
});
