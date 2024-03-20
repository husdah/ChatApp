import React, {useState, useContext} from "react";

//INTERNAL IMPORT
import Style from './Friend.module.css';
import Card from "./Card/Card";
import Chat from './Chat/Chat';
import { ChatAppContext } from '../../Context/ChatAppContext';

const Friend = () => {
  const { sendMessage, account, friendLists, userLists, readMessage, userName, userImage, loading, currentUserName, currentUserAddress, currentUserImage, readUser, friendMsg, searchList, setError } = useContext(ChatAppContext);
  console.log(friendLists);

  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {!searchList && friendLists.map((el,i)=> (
            <Card 
              key={i+1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
              userLists={userLists}
            />
          ))}
          {searchList && searchList.map((el,i)=> (
            <Card 
              key={i+1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
              userLists={userLists}
            />
          ))} 
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            currentUserImage={currentUserImage}
            readUser={readUser}
            setError={setError}
            userImage={userImage}
          />
        </div>
      </div>
    </div>
  )
};

export default Friend;
