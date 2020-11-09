import React from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';

class EditUserModal extends React.Component {

  constructor(props) {
    super(props);
    const { userData } = props;
    let { screenName, age, profilePicSrc, email } = userData;
    age = age.toString();
    this.state = { name: screenName, email: email, age: age, image: profilePicSrc };
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleCancel = () => {
    const { closeModalCallback } = this.props;
    // close model and dont send any data to backend
    closeModalCallback(false, null);
  }

  handleSubmit = () => {
    const { closeModalCallback } = this.props;
    const { name, email, age, image } = this.state;

    const data = {
      screenName: name,
      email: email,
      age: age,
      profilePicSrc: image
    }

    // close model and send data to backend
    closeModalCallback(true, data)
  }

  render() {
    const { userData } = this.props;
    const { name, email, age, image } = this.state;
    return (
      <Modal
        onClose={this.handleCancel}
        open={true}
        closeIcon
        closeOnDimmerClick={false}
        closeOnEscape={false}
      >
        <Modal.Header>
          Edit user
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Name'
                placeholder='name'
                id='name'
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label='Email'
                placeholder='email'
                id='email'
                value={email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Age'
                placeholder='age'
                id='age'
                value={age}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label='Image'
                placeholder='image link'
                id='image'
                value={image}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default EditUserModal;