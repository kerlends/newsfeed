import type { Resolvers } from "../resolver-types";

const QueryResolver: Resolvers["Query"] = {
  project: async (root, { id }, { db }) => {
    const project = await db.project.findUnique({ where: { id } });
    return project ?? undefined;
  },
};

const ProjectResolver: Resolvers["Project"] = {
  users: async ({ id }, args, { db }) => {
    return await db.user.findMany({
      where: {
        projects: {
          some: {
            userId: id,
          },
        },
      },
    });
  },
};

export const resolvers: Resolvers = {
  Project: ProjectResolver,
  Query: QueryResolver,
};
