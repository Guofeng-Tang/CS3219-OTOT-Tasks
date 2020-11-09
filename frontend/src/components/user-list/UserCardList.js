import React from 'react'
import {Header, List, Segment} from 'semantic-ui-react'
import UserCard from "./UserCard";

class UserCardList extends React.Component {

  renderUserCards = (users) => {
    const { callback } = this.props;

    return users.map(u => {
      const id = u._id;
      return <UserCard callback={callback} key={id} user={u} />
    })
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <Header as="h1" attached='top'>List of users</Header>
        <Segment attached>
          <List>
            {this.renderUserCards(users)}
          </List>
        </Segment>
      </div>
    );
  }
}

export default UserCardList;
