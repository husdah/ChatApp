import React from "react";
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './UserCard.module.css';
import images from '../../assets';

const UserCard = ({el, i, addFriends}) => {
  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image 
          src={images[`image${i +1}`]} 
          alt="user" 
          width={100} 
          height={100}
          className={Style.UserCard_box_img}
        />

        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0,25)}..</p>
          <button onClick={()=> addFriends({name: el.name, accountAddress: el.accountAddress, profileImage: el.profileImage})}>Add Friend</button>
        </div>
      </div>
      <small className={Style.number}>{i+1}</small>
    </div>
  )
};

export default UserCard;
