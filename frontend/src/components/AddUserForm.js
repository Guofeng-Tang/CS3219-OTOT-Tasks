import React from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import BackendURL from "../Path";

class AddUserForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: '', email: '', age: '', image: '' }
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // send details to backend
    const { name, email, age, image } = this.state;
    const data = {
      screenName: name,
      profilePicSrc: image,
      age: age,
      email: email
    };

    fetch(`${BackendURL}/api/users`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        // update list of users
        const { callback } = this.props;
        callback();
      })
      .catch((err) => console.error(err))

    // reset fields
    this.setState({ name: '', email: '', age: '', image: '' });
  }

  // age, profilepic, screen name, email
  render() {
    const { name, email, age, image } = this.state;
    return (
      <div>
        <Header as="h1" attached='top'>Add a new user</Header>
        <Segment attached>
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
            <Form.Button onClick={this.handleSubmit}>
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }

}

export default AddUserForm;