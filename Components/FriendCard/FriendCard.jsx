import React from "react";
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './friendCard.module.css'
import images from '../../assets';
import Link from 'next/link'

const FriendCard = ({el, i, addFriends}) => {
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
          <h3>{el[1]}</h3>
          <p>{el[0].slice(0,25)}..</p>
          <button> <Link href={{pathname: '/', query: {name: `${el.name}`, address: `${el.pubkey}`}}}>Let's Chat</Link></button>
        </div>
      </div>

      <small className={Style.number}>{i+1}</small>
    </div>
  )
};

export default FriendCard;