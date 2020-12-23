import { useFormik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { ResourceForm } from '../../components/ResourceForm';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const ResourceDetails = ({ match }) => {
  const history = useHistory();
  const toast = React.useContext(ToastContext);

  const form = useFormik({
    initialValues: {
      title: '',
      featuredImage: '',
      category: '',
      externalLink: '',
      content: '',
      color: '',
      resourceType: '',
      categories: [],
      parts: [],
      video: '',
      showTitle: true,
    },
    // tslint:disable-next-line:no-empty
    onSubmit: () => {},
  });

  React.useEffect(() => {
    init();
  }, [match.params.id]);

  const init = async () => {
    const { error, data } = await Api.getResourceById(match.params.id);

    if (error) {
      return;
    }

    form.setValues({
      ...data,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const {
      title,
      featuredImage,
      category,
      externalLink,
      content,
      color,
      video,
      showTitle,
      parts,
    } = form.values;
    const data = {
      title,
      featuredImage,
      category,
      externalLink,
      content,
      color,
      parts,
      video,
      showTitle,
    };
    const { error } = await Api.updateResource(match.params.id, data);

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
      const { error } = await Api.deleteResource(match.params.id);

      if (error) {
        toast.open({ message: JSON.stringify(error) });
        return;
      }

      toast.open({ message: 'Success' });
      history.push(`/dashboard/resources`);
    }
  };

  return (
    <Layout title="Resource">
      <ResourceForm
        mode="update"
        form={form}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Layout>
  );
};
