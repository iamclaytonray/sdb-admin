import { useFormik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { SermonForm } from '../../components/SermonForm';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const CreateSermon = () => {
  const history = useHistory();

  const toast = React.useContext(ToastContext);

  const form = useFormik({
    initialValues: {
      title: '',
      featuredImage: '',
      category: '',
      color: '',
      content: '',
      video: '',
      categories: [],
      parts: [],
      showTitle: true,
    },
    // tslint:disable-next-line
    onSubmit: () => {},
  });

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const { title, category, featuredImage, color, content } = form.values;

    const { error } = await Api.createSermon({
      title,
      category,
      featuredImage,
      color,
      content,
      parts: [],
      order: 1000,
      // parts: reduxForm,
      // order: sermonsLength + 1,
    });

    if (error) {
      toast.open({ message: error });
    }

    history.push(`/dashboard/sermons`);
  };

  return (
    <Layout title="Create Sermon">
      <SermonForm mode="create" form={form} handleCreate={handleCreate} />
    </Layout>
  );
};
