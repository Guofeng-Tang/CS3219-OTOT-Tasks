import React from 'react';
import {Image, List} from "semantic-ui-react";

class UserCard extends React.PureComponent {
    render() {
        const {user} = this.props;
        const {email, screenName, profilePicSrc, age} = user;
        return (
            <List.Item>
                <Image avatar src={profilePicSrc}/>
                <List.Content>
                    <List.Header as='a'>{screenName}</List.Header>
                    <List.Description>
                        Email: {email}
                        <br/>
                        Age: {age}
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
}

export default UserCard
