import { JobType } from ".";

export type filterType = {
  username?: string;
  hourly: number;
  hourlyBetween?: number[];
  price: number;
  selectedState: string;
  selectedCity: string;
  jobType: JobType;
};
