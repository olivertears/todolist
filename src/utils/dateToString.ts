export const dateToString = (date: number) => new Date(date).toISOString().split('T')[0];
