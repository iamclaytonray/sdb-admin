import React from 'react';
import { Link } from 'react-router-dom';

export const Announcement = ({ announcement }) => {
  return (
    <div className='text-center'>
      <Link to={`announcements/${announcement.slug}`}>
        {announcement.title}
      </Link>
    </div>
  );
}