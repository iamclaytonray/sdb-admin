import * as React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

export const Parts = () => (
  <div>
    <FormGroup>
      <Label>Part Number</Label>
      <Input
        type="text"
        name="partNumber"
        placeholder="Part Number"
        value={this.state.partNumber}
        className="form-control"
        onChange={this.handleInputChange}
      />
    </FormGroup>

    <FormGroup>
      <Label>Anchor Link</Label>
      <Input
        type="text"
        name="anchorLink"
        placeholder="Anchor Link"
        value={this.state.anchorLink}
        className="form-control"
        onChange={this.handleInputChange}
      />
    </FormGroup>

    <FormGroup>
      <Label>Medium Link</Label>
      <Input
        type="text"
        name="mediumLink"
        placeholder="Medium Link"
        value={this.state.mediumLink}
        className="form-control"
        onChange={this.handleInputChange}
      />
    </FormGroup>

    <FormGroup>
      <Label>YouTube Link</Label>
      <Input
        type="text"
        name="youtubeLink"
        placeholder="YouTube Link"
        value={this.state.youtubeLink}
        className="form-control"
        onChange={this.handleInputChange}
      />
    </FormGroup>
  </div>
);

export class Part extends React.Component {
  public state = {
    parts: [],
    partNumber: 0,
    anchorLink: '',
    mediumLink: '',
    youtubeLink: '',
  };
  public handleInputChange = () => {
    console.log('Yes');
  }
  public render() {
    return <div>{/* <Parts /> */}</div>;
  }
}
