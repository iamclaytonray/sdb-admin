import React from 'react';
import { Link } from 'react-router-dom';

export const Announcement = ({ announcement }) => {
  return (
    <div>
      <Link to={`admin/announcements/${announcement.slug}`}>
        {announcement.title}
      </Link>
      {announcement.timestamp}
    </div>
  );
}