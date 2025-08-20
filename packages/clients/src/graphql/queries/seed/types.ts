export type SeedData = {
  createdAt: string;
  id: string;
  type: string;
  updatedAt: string;
  userId: string;
  value: string;
};

export type SeedsByTypes = {
  seedsByTypes: {
    race: SeedData[];
    noun: SeedData[];
    faction: SeedData[];
    adjective: SeedData[];
  };
};
