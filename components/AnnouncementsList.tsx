import { gql } from "@apollo/client";
import {
  FellowshipAnnouncementsQuery,
  useFellowshipAnnouncementsQuery,
} from "generated/graphql";

import { useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import AnnouncementCard from "components/AnnouncementCard";

interface AnnouncementsListProps {
  fellowship?: string;
  gutterSpacing?: number | string;
}

export default function AnnouncementsList({
  fellowship,
  gutterSpacing = "1rem",
}: AnnouncementsListProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<
    FellowshipAnnouncementsQuery["announcements"]["data"]
  >([]);

  const FETCH_COUNT = 3;

  const {
    error,
    previousData,
    data: queryData,
  } = useFellowshipAnnouncementsQuery({
    skip: !fellowship,
    variables: {
      input: {
        skip: (page - 1) * FETCH_COUNT,
        take: FETCH_COUNT,
        where: fellowship ? { fellowship: { equals: fellowship } } : undefined,
      },
    },
    onCompleted: (data) =>
      setData((prev) => prev.concat(data.announcements.data)),
  });

  const result = data;
  const total = queryData?.announcements.total;

  if (!result || error || typeof total === "undefined") {
    return null;
  }

  const handleFetchNext = (start: number) => {
    setPage(Math.ceil(start / FETCH_COUNT));
  };

  if (data.length === 0) {
    return <p>No recent announcements found, for now.</p>;
  }

  return (
    <InfiniteLoader
      isItemLoaded={(index) => !!data[index]}
      itemCount={total}
      loadMoreItems={handleFetchNext}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer ref={ref}>
          {({ height, width }) => (
            <FixedSizeList
              itemSize={300}
              itemCount={total}
              height={height - 100}
              width={width}
              onItemsRendered={onItemsRendered}
              itemData={data}
            >
              {({ data, style, index }) => (
                <AnnouncementCard
                  style={{
                    ...style,
                    top: `calc(${style.top}px - ${gutterSpacing})`,
                    height: `calc(${style.height}px - ${gutterSpacing})`,
                  }}
                  announcement={data[index]}
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
  query FellowshipAnnouncements($input: AnnouncementsQueryInput) {
    announcements(input: $input) {
      total
      data {
        id
        title
        body
        date: createdAt
      }
    }
  }
`;
