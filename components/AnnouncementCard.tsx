import format from "date-fns/format";
import parse from "date-fns/parseISO";
import React from "react";
import Card from "./Card";

interface Announcement {
  id: any;
  title: string;
  body: string;
  date: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  style?: React.CSSProperties;
}

export default function AnnouncementCard({
  announcement: { title, body, date },
  style,
}: AnnouncementCardProps) {
  return (
    <Card style={style}>
      <h2>{title}</h2>
      <p>{body}</p>
      <small>{`Posted ${format(parse(date), "HH:mm dd/MM/yyyy")}`}</small>
    </Card>
  );
}
