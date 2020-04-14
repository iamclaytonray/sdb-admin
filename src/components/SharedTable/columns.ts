import moment from 'moment';

export const columns = {
  events: {
    columns: [
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'createdAt',
        label: 'Created At',
        options: {
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
    ],
  },
  resources: {
    columns: [
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
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
    ],
  },
  sermons: {
    columns: [
      {
        name: 'title',
        label: 'Title',
      },
      {
        name: 'slug',
        label: 'Slug',
      },
      {
        name: 'category',
        label: 'Category',
      },
      {
        name: 'createdAt',
        label: 'Created At',
        options: {
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        options: {
          customBodyRender: (v: string) => moment(v).format('LLLL'),
        },
      },
    ],
  },
};
