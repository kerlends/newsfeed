import type { Resolvers } from "../resolver-types";

const QueryResolvers: Resolvers["Query"] = {
  announcements: async (root, { input }, { db }) => {
    const [data, total] = await Promise.all([
      db.announcement.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          fellowship: input?.where?.fellowship || "all",
        },
        take: input?.take,
        skip: input?.skip,
      }),
      db.announcement.count({
        where: { fellowship: input?.where?.fellowship || "all" },
      }),
    ]);

    return { data, total };
  },
};

export const resolvers: Resolvers = {
  Query: QueryResolvers,
};
