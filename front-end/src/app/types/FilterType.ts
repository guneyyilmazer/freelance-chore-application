import { JobType } from ".";

export type filterType = {
    hourly: number;
    price: number;
    selectedState: string;
    selectedCity: string;
    jobType: JobType;
  };