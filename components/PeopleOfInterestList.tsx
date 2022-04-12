import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { gql } from "@apollo/client";
import { useRef, useState } from "react";
import { FixedSizeList } from "react-window";

import UserCard from "components/UserCard";
import {
  PeopleOfInterestQuery,
  usePeopleOfInterestQuery,
} from "./PeopleOfInterestList.generated";

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
  const [data, setData] = useState<PeopleOfInterestQuery["users"]["data"]>([]);

  const FETCH_COUNT = 4;

  const fellowshipsOfInterest = getConnectedFellowships(fellowship);

  const {
    error,
    previousData,
    data: queryData,
  } = usePeopleOfInterestQuery({
    skip: !fellowship,
    variables: {
      input: {
        skip: (page - 1) * FETCH_COUNT,
        take: FETCH_COUNT,
        where: {
          fellowship: { in: fellowshipsOfInterest },
        },
      },
    },
    onCompleted: (data) => setData((prev) => prev.concat(data.users.data)),
  });

  const users = data;
  const totalUsers = queryData?.users.total || previousData?.users.total;

  if (!users || typeof totalUsers !== "number" || error) {
    return null;
  }

  const handleFetchNext = (start: number) => {
    setPage(Math.ceil(start / FETCH_COUNT) + 1);
  };

  return (
    <InfiniteLoader
      key={fellowship}
      isItemLoaded={(index) => !!data[index]}
      itemCount={totalUsers}
      loadMoreItems={handleFetchNext}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer ref={ref}>
          {({ height, width }) => (
            <FixedSizeList
              itemSize={400}
              itemCount={totalUsers}
              height={height - 100}
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
