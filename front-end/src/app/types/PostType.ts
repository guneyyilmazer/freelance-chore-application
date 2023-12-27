import { JobType } from "./JobType";

export type post = {
  _id: string;
  user: string;
  picture: string;
  pictures: string[];
  title: string;
  description: string;
  price: number;
  type: JobType;
};
