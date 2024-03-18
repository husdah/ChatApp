import React, { useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './Card.module.css';
import images from '../../../assets';
import { ChatAppContext } from '../../../Context/ChatAppContext';

const Card = ({readGroupMessages, el, i}) => {

  const { userName } = useContext(ChatAppContext);

  console.log(el);
  return (
    <Link href={{pathname: '/group', query: {name: `${el.name}`, address: `${el.groupHash}`}}}>
      <div className={Style.Card} onClick={() => readGroupMessages(el.groupHash)}>
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image src={images.accountName} alt="username" width={50} height={50} className={Style.Card_box_left_img} />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4>{el.name}</h4>
              <p className={Style.hash}>{el.groupHash.slice(0,25)}..</p>
              {el.members && el.members.map((member, index) => (
                <React.Fragment key={index}>
                    <small>{member.name === userName ? 'You' : member.name.split(' ')[0]}</small>
                    {index !== el.members.length - 1 && <small> , </small>}
                </React.Fragment>
              ))}
            </div>
            <div className={Style.Card_box_right_end}>
              <small>{i +1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
};

export default Card;
