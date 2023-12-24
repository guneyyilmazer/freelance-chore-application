export type user = {
  username: string;
  accountType: { freelancer?: true; hirer?: true };
  location: { state: string; city: string };

  freelancerDetails?: { jobType: JobType; hourlyWage: number,aboutMe:string };
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
type JobType = {
  cleaning?: true;
  walkingTheDog?: true;
  cuttingGrass?: true;
  movingHeavyObjects?: true;
  plumbering?: true;
};