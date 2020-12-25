import moment from 'moment';

export const columns = {
  events: {
    columns: [
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
        },
      },
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'createdAt',
        label: 'Created At',
        options: {
          sortDirection: 'desc',
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
    ],
  },
  resources: {
    columns: [
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
        },
      },
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'resourceType',
        label: 'Type',
      },
      {
        name: 'createdAt',
        label: 'Created At',
        options: {
          sortDirection: 'desc',
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
    ],
  },
  sermons: {
    columns: [
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
        },
      },
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'category',
        label: 'Category',
      },
      {
        name: 'createdAt',
        label: 'Created At',
        options: {
          sortDirection: 'desc',
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).fromNow(),
        },
      },
    ],
  },
};
