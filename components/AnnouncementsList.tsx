import { gql } from "@apollo/client";
import { useFellowshipAnnouncementsQuery } from "generated/graphql";

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

  const { error, previousData, data, loading } =
    useFellowshipAnnouncementsQuery({
      variables: {
        input: {
          take: 8 * page,
          where: fellowship
            ? { fellowship: { equals: fellowship } }
            : undefined,
        },
      },
    });

  const result = data?.announcements || previousData?.announcements;

  if (!result || error) {
    return null;
  }

  const handleFetchNext = (start: number) => {
    setPage(Math.ceil(start / 8) + 1);
  };

  if (result.data.length === 0) {
    return <p>No recent announcements found, for now.</p>;
  }

  return (
    <InfiniteLoader
      isItemLoaded={(index) => !!result.data[index]}
      itemCount={result.total}
      loadMoreItems={handleFetchNext}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer ref={ref}>
          {({ height, width }) => (
            <FixedSizeList
              itemSize={300}
              itemCount={result.total}
              height={height - 100}
              width={width}
              onItemsRendered={onItemsRendered}
              itemData={result.data}
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
