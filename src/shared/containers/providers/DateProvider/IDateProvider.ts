interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  getDateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  isStartDateBeforeThanDate(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
