
import React, { useEffect, useState } from 'react';
import './App.css';
import CreateChannel from './components/channel/CreateChannel';
import UseEventHandler from './components/channel/UseEventHandler';
import ChatWindow from './components/messages/ChatWindow';

const App = ()=> {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);

  const chatChannel = CreateChannel('chat:room123', {});
  
  UseEventHandler(chatChannel, 'user_joined', response => {
       const {room, user}  = response;
       setUser(user);
       setRoom(room);
       localStorage.setItem("user",JSON.stringify({id : user.id, name: user.name}));
       localStorage.setItem("room",JSON.stringify({session_id : room.session_id, created_by: room.created_by, inserted_at: room.inserted_at}));
  });

  UseEventHandler(chatChannel, 'new_message', message => {
      console.log('newMessage', message);
      setMessages(messages => [...messages, message])
  });

  UseEventHandler(chatChannel, 'archived_message', message => {
       console.log('archived', messages)
      setMessages(messages => [message, ...messages])
  });

  UseEventHandler(chatChannel, 'archived_message_count', payload => {
     const { page: {count} } = payload;
     console.log('total archived message count', count);
  });

  const pushMessage = (message)=>{
      console.log('channel', chatChannel);
      setMessages(messages => [...messages, message]);
      chatChannel.push('new_message', {content: message});
      console.log('channel', chatChannel);
  };

  console.log('message one two', messages);

  return (
      <div className="App">
          <ChatWindow messages={messages} pushMessage={pushMessage} user={user} room={room}/>
      </div>
  );
}

export default App;
