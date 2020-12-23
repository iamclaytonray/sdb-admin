import { useFormik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { SermonForm } from '../../components/SermonForm';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const SermonDetails = ({ match }) => {
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

  const {
    title,
    featuredImage,
    category,
    color,
    video,
    content,
    showTitle,
    parts,
  } = form.values;

  React.useEffect(() => {
    init();
  }, [match.params.id]);

  const init = async () => {
    const { error, data } = await Api.getSermonById(match.params.id);

    if (error) {
      toast.open({ message: JSON.stringify(error) });
      return;
    }

    form.setValues({
      ...data,
      content: data.content || '',
      parts: data.parts || [],
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const data = {
      title,
      featuredImage,
      category,
      color,
      content,
      video,
      showTitle,
      parts,
    };

    const { error } = await Api.updateSermon(match.params.id, data);

    if (error) {
      toast.open({ message: JSON.stringify(error) });
      return;
    }

    toast.open({ message: 'Success' });
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure? This action cannot be undone.',
    );
    if (confirm) {
      const { error } = await Api.deleteSermon(match.params.id);

      if (error) {
        toast.open({ message: JSON.stringify(error) });
        return;
      }

      toast.open({ message: 'Success' });
      history.push(`/dashboard/sermons`);
    }
  };

  return (
    <Layout title="Sermon">
      <SermonForm
        form={form}
        mode="update"
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Layout>
  );
};
