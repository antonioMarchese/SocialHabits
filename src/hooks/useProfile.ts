"use client";
import { api } from "@/trpc/react";
import { Prisma } from "@prisma/client";
import { skipToken, useQuery, useQueryClient } from "@tanstack/react-query";

const profileWithRelations = Prisma.validator<Prisma.UsersDefaultArgs>()({
  include: {
    habits: true,
    days: true,
  },
});
export type ProfileWithRelations = Prisma.UsersGetPayload<
  typeof profileWithRelations
>;

export const useProfile = () => {
  const utils = api.useUtils();
  const { isFetching, data } = api.users.me.useQuery();

  const setProfile = (profile: ProfileWithRelations) => {
    utils.users.me.setData(undefined, {
      ...profile,
    });
  };

  return {
    profile: data as ProfileWithRelations,
    setProfile,
    isFetching,
  };
};
