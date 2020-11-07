import React from 'react'
import {Image, List} from 'semantic-ui-react'
import UserCard from "./UserCard";

const u =  {
    "screenName": "alsjdflajsdfl",
    "profilePicSrc": "https://imgur.com/I80W1Q0.png",
    "age": 0,
    "email": "hello@a.com",
}

const UserCardList = () => (
    <List>
        <UserCard user={u}/>
        <UserCard user={u}/>
        <UserCard user={u}/>
    </List>
)

export default UserCardList
