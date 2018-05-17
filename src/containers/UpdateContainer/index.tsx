import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import { Mutation } from 'react-apollo';

// interface IProps {
//   mutationName: string;
//   variable: string;
// }

const handleUpdate = (e, data, variables) => {
  e.preventDefault();
  data({
    variables: {
      variables,
    },
  }).then(d => {
    console.log(d);
    // do something else here
  });
};

export const UpdateContainer = ({ mutationName, variables }) => {
  console.log(variables);
  return (
    <Mutation mutation={mutationName}>
      {(data, { loading, error }) => {
        return (
          <React.Fragment>
            {loading && <Loading />}
            {error && <Error error={error} />}
            <button
              className="btn btn-primary"
              onSubmit={e => handleUpdate(e, data, variables)}
            >
              Update
            </button>
          </React.Fragment>
        );
      }}
    </Mutation>
  );
};
