import type { Resolvers } from "../resolver-types";

const UserResolvers: Resolvers["User"] = {
  projects: async ({ id }, args, { db }) => {
    return await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
    });
  },
};

const QueryResolvers: Resolvers["Query"] = {
  user: async (root, { id }, { db }) => {
    return (await db.user.findUnique({ where: { id } })) ?? undefined;
  },
  users: async (root, { input }, { db }) => {
    const [data, total] = await Promise.all([
      db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: input?.take,
        skip: input?.skip,
        where: input?.where,
      }),
      db.user.count({
        where: input?.where,
      }),
    ]);

    return { data, total };
  },
};

export const resolvers: Resolvers = {
  Query: QueryResolvers,
  User: UserResolvers,
};
