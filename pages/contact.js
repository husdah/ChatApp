import React, {useState, useEffect, useContext} from "react";
import Story from "../Components/Story/Story";
import Image from "next/image";

//INTERNAL IMPORT
import Style from '../styles/alluser.module.css';
import { ChatAppContext } from "../Context/ChatAppContext";
import {FriendCard} from "../Components/index";

const alluser = () => {
  const { userLists, addFriends ,friendLists,currentUserAddress, storyList, friendStoryList} = useContext(ChatAppContext);

  console.log(friendStoryList);
  return (
    <div>
       <div className={Style.container}>
      <h1>Discover Stories</h1>
      <div className={Style.stories}>
        <Story 
        storyList = {storyList} 
        username = "Your Stories"
        isFriend = {false}
        />
         {friendStoryList.map((friendStory) => (
 
              <Story 
              storyList={friendStory.stories}
              username = {friendStory.friendName}
              friendAddress = {friendStory.friendAddress}
              isFriend = {true}
               />
        ))}
      </div>
      </div>
      <div className={Style.alluser_info}>
        <h1>Friends List</h1>
      </div>

      <div className={Style.alluser}>
        {friendLists.map((el,i) => (
          <FriendCard el={el} i={i}/> 
        ))}
      </div>
    </div>
  )
};

export default alluser;