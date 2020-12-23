import { useFormik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { ResourceForm } from '../../components/ResourceForm';
import { Api } from '../../utils/Api';

export const CreateResource = () => {
  const history = useHistory();
  // const reduxForm = useSelector(
  //   (s: any) => s?.form?.partsForm?.values?.parts || [],
  // );
  // const resourcesLength = useSelector(
  //   (s: any) => Object.values(s.resources.allResources || {}).length,
  // );
  const form = useFormik({
    initialValues: {
      title: '',
      featuredImage: '',
      link: '',
      color: '#B56FEA',
      content: '',
      category: '',
      video: '',
      parts: [],
    },

    onSubmit: () => {},
  });

  const {
    title,
    featuredImage,
    link,
    color,
    content,
    video,
    category,
    parts,
  } = form.values;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await Api.createResource({
      title,
      featuredImage,
      link,
      content,
      color,
      video,
      category,
      parts: parts || [],
      // order: resourcesLength + 1,
    });

    history.push(`/dashboard/jewish`);
  };

  return (
    <Layout>
      <ResourceForm mode="create" form={form} handleCreate={handleSubmit} />
    </Layout>
  );
};
