import { JobType } from "./JobType";

export type post = {
  createdAt: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
  };
  hired: boolean;
  completed: boolean;
  completedDate:string,
  reviews: {
    hirerReview: { text: string; star: number };
    freelancerReview: { text: string; star: number };
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
  availability: { partTime?: true; fullTime?: true };
  location: {
    state: string;
    city: string;
  };
  type: JobType;
};
