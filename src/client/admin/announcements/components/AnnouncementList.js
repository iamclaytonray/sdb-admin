import React from 'react';
import AnnouncementListContainer from '../containers/AnnouncementListContainer';

const AnnouncementList = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                </tr>
              </tbody>
              <AnnouncementListContainer />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementList;