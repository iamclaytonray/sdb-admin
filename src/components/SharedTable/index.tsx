import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectSermon } from '../../store/actions/sermons';
import { NewButton } from '../NewButton';

export const SharedTable = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (id: string, slug: string) => {
    dispatch(selectSermon(id));
    history.push(`/dashboard/${props.resource}/${slug}`);
  };

  return (
    <div>
      <NewButton location={props.newLink}>{props.children}</NewButton>
      <Row>
        <Col lg={8}>
          {props?.data.map((item: any) => {
            return (
              <Col lg={4} key={item.slug} style={{ marginBottom: 16 }}>
                <span onClick={() => handleClick(item._id, item.slug)}>
                  {item.title}
                </span>
              </Col>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};
