import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import { Mutation } from 'react-apollo';

// interface IProps {
//   mutationName: string;
//   variable: string;
// }

const handleDelete = (e, data, variable, history) => {
  e.preventDefault();
  data({
    variables: {
      // not working
      slug: variable,
    },
  }).then(d => {
    console.log(d);
    history.push('/dashboard');
    // do something else here
  });
};

export const DeleteContainer = ({ mutationName, variable, history }) => {
  return (
    <Mutation mutation={mutationName}>
      {(data, { loading, error, called }) => {
        return (
          <React.Fragment>
            {loading && <Loading />}
            {error && <Error error={error} />}
            {/* {called && <p>Called {called}</p>} */}
            <button
              className="btn btn-danger"
              onClick={e => handleDelete(e, data, variable, history)}
            >
              Delete
            </button>
          </React.Fragment>
        );
      }}
    </Mutation>
  );
};
