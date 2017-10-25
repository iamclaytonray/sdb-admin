import React from 'react';
import { Link } from 'react-router-dom';

export const Announcement = ({ announcement }) => {
  return (
    <div>
      <tr>
        <td><Link to={`admin/announcements/${announcement.slug}`}>{announcement.title}</Link></td>
        <td>{announcement.timestamp}</td>
      </tr>
    </div>
  );
}