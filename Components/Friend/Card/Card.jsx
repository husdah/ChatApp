import React, {useEffect} from "react";
import Image from 'next/image';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './Card.module.css';
import images from '../../../assets';

const Card = ({readMessage, readUser, userLists, el, i}) => {

  const [currentUserName, setCurrentUserName] = React.useState("");
  const [currentUserImage, setCurrentUserImage] = React.useState("");

  useEffect(() => {
    userLists && el && 
      userLists.map((user) => {
            if (user.accountAddress === el.pubkey) {
                setCurrentUserName(user.name);
                setCurrentUserImage(user.profileImage);
            }
      })  
  },[userLists, el])

  console.log(el);
  console.log('userList',userLists);
  return (
    <Link href={{pathname: '/', query: {name: `${currentUserName}`, address: `${el.pubkey}`}}}>
      <div className={Style.Card} onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}>
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
              <Image src={currentUserImage ? `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${currentUserImage}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd` : images.accountName} alt="username" width={50} height={50} style={{borderRadius: '50%'}} className={Style.Card_box_left_img} key={el.pubkey}/>
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
                <h4>{currentUserName}</h4>
              <small>{el.pubkey.slice(21)}..</small>
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
