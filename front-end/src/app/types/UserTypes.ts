import { JobType } from ".";
export type user = {
  username: string;
  isLoggedIn: boolean;
  accountType: { freelancer?: true; hirer?: true };
  location: { state: string; city: string };

  freelancerDetails?: { jobType: JobType; hourlyWage: number; aboutMe: string };
  userId: string;
  profilePicture?: string;
  _id?: string;
};
export type seenByUser = {
  userId: string;
  username: string;
  profilePicture: string;
  time?: Date;
};
