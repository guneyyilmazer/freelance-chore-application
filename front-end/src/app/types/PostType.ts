import { JobType } from "./JobType";

export type post = {
  createdAt: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
  };
  updatedAt: string;
  postedTimeAgoText: string;
  _id: string;
  user: string;
  picture: string;
  pictures: string[];
  title: string;
  description: string;
  price: number;
  hourly: number;
  skillLevel: string;
  location: {
    state: string;
    city: string;
  };
  type: JobType;
};
