import React from 'react';
import AddUserForm from "./AddUserForm";
import UserCardList from "./user-list/UserCardList";
import BackendURL from "../Path";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    // fetch users
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch(`${BackendURL}/api/users`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        const { status, data } = res;
        if (status) {
          this.setState({ users: data });
        }
      })
      .catch((err) => console.error(err))
  }

  newUserCallback = () => {
    // fetch users after new user has been added
    this.fetchUsers();
  }

  render() {
    const { users } = this.state;
    return (
      <div className="ui segment">
        <AddUserForm callback={this.newUserCallback} />
        { users ? <UserCardList users={users} callback={this.newUserCallback} /> : null }
      </div>
    );
  }
}

export default App;
