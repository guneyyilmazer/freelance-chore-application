import { JobType } from "./JobType";

export type post = {
  _id: string;
  user: string;
  picture: string;
  pictures: string[];
  title: string;
  description: string;
  price: number;
  hourly: number;
  location: {
    state: string;
    city: string;
  };
  type: JobType;
};
