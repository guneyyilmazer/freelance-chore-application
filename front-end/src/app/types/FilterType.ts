import { JobType } from ".";

export type filterType = {
  username?: string;
  availability:string,
  hourly: number;
  hourlyBetween?: number[];
  price: number;
  selectedState: string;
  selectedCity: string;
  jobType: JobType;
};
