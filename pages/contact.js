import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT
import Style from '../styles/alluser.module.css';
import { ChatAppContext } from "../Context/ChatAppContext";
import {FriendCard} from "../Components/index";

const alluser = () => {
  const { userLists, addFriends ,friendLists,currentUserAddress} = useContext(ChatAppContext);
  
  return (
    <div>
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