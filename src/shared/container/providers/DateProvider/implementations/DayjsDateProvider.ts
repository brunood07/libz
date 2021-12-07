import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }
  convertToUTC(date: Date): string {
    throw new Error("Method not implemented.");
  }
  dateNow(): Date {
    throw new Error("Method not implemented.");
  }
  compareInDays(start_date: Date, end_date: Date): number {
    throw new Error("Method not implemented.");
  }
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
  addHours(hours: number): Date {
    throw new Error("Method not implemented.");
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    throw new Error("Method not implemented.");
  }
}

export { DayjsDateProvider };