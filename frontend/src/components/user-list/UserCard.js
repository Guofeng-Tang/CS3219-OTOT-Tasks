import React from 'react';
import { Image, List, Segment, Button, Icon } from "semantic-ui-react";
import EditUserModal from "./EditUserModal";
import BackendURL from "../../Path";

class UserCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = { isEditModalOpen: false };
  }

  handleEdit = (event) => {
    event.preventDefault();
    this.setState({ isEditModalOpen: true });
  }

  closeModalCallback = (isSubmit, data) => {
    this.setState({ isEditModalOpen: false });

    if (isSubmit) {
      const {callback, user} = this.props;
      const id = user._id;
      fetch(`${BackendURL}/api/users/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          // update list of users
          callback();
        })
        .catch((err) => console.error(err));


    }
  }


  handleDelete = (event) => {
    event.preventDefault();
    const { user, callback } = this.props;
    const id = user._id;

    fetch(`${BackendURL}/api/users/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then(() => {
        // update list of users
        callback();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { user } = this.props;
    const { email, screenName, profilePicSrc, age } = user;
    const { isEditModalOpen } = this.state;

    return (
      <React.Fragment>
        { isEditModalOpen
          ? <EditUserModal
            closeModalCallback={this.closeModalCallback}
            userData={user}
          />
          : null
        }
        <List.Item>
          <Segment>
            <List.Content floated='right'>
              <Button icon onClick={this.handleEdit}>
                <Icon name='edit' />
                Edit
              </Button>
              <Button icon color='red' onClick={this.handleDelete}>
                <Icon name='times' />
                Delete
              </Button>
            </List.Content>
            <Image avatar src={profilePicSrc}/>
            <List.Content>
              <List.Header>{screenName}</List.Header>
              <List.Description>
                Email: {email}
                <br/>
                Age: {age}
              </List.Description>
            </List.Content>
          </Segment>
        </List.Item>
      </React.Fragment>
    );
  }
}

export default UserCard
