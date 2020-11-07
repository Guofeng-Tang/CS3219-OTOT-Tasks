import './App.css';
import {List} from 'semantic-ui-react'
import UserCard from "./UserCard";

const u = {
    "screenName": "alsjdflajsdfl",
    "profilePicSrc": "https://imgur.com/I80W1Q0.png",
    "age": 0,
    "email": "hello@a.com",
}

const us = [u, u, u]

function App() {
    return (
        <List>
            {us.map(u => <UserCard user={u}/>)}
        </List>
    );
}

export default App;
