import { supabase } from "@repo/db/supabase";

export const resolvers = {
  Query: {
    maps: async () => {
      const { data } = await supabase.from("maps").select("*");
      return data ?? [];
    }
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addMap: async (_: any, { name, description }: any) => {
      const { data } = await supabase
        .from("maps")
        .insert({ name, description })
        .select()
        .single();
      return data;
    }
  }
};
