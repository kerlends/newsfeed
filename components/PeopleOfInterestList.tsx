import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { gql } from "@apollo/client";
import { useState } from "react";
import { FixedSizeList } from "react-window";

import UserCard from "components/UserCard";
import { usePeopleOfInterestQuery } from "generated/graphql";

function getConnectedFellowships(fellowship: string) {
  switch (fellowship) {
    case "founders":
    case "angels":
      return ["founders", "angels"];
    case "writers":
      return ["writers"];
    default:
      return ["all"];
  }
}

interface PeopleOfInterestListProps {
  fellowship: string;
  gutterSpacing?: number | string;
}

export default function PeopleOfInterestList({
  gutterSpacing = "1rem",
  fellowship,
}: PeopleOfInterestListProps) {
  const [page, setPage] = useState(1);

  const fellowshipsOfInterest = getConnectedFellowships(fellowship);

  const { error, previousData, data } = usePeopleOfInterestQuery({
    skip: !fellowship,
    variables: {
      input: {
        take: page * 8,
        where: {
          fellowship: { in: fellowshipsOfInterest },
        },
      },
    },
  });

  const users = data?.users?.data || previousData?.users.data;
  const totalUsers = data?.users.total || previousData?.users.total;

  if (!users || typeof totalUsers !== "number" || error) {
    return null;
  }

  const handleFetchNext = (start: number) => {
    setPage(Math.ceil(start / 8) + 1);
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <InfiniteLoader
      key={fellowship}
      isItemLoaded={(index) => !!users[index]}
      itemCount={totalUsers}
      loadMoreItems={handleFetchNext}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer ref={ref}>
          {({ height, width }) => (
            <FixedSizeList
              itemSize={width}
              itemCount={totalUsers}
              height={height}
              width={width}
              onItemsRendered={onItemsRendered}
              itemData={users}
            >
              {({ data, style, index }) => (
                <UserCard
                  style={{
                    ...style,

                    top: `calc(${style.top}px - ${gutterSpacing})`,
                    height: `calc(${style.height}px - ${gutterSpacing})`,
                  }}
                  user={data[index]}
                />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}

gql`
  query PeopleOfInterest($input: UsersQueryInput) {
    users(input: $input) {
      total
      data {
        id
        name
        bio
        fellowship
        avatarUrl
        projects {
          id
          name
          iconUrl
        }
      }
    }
  }
`;
