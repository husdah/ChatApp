import React, { useState, useEffect, useContext} from 'react';
import { FaTimes , FaTelegramPlane } from 'react-icons/fa';
import Image from 'next/image';
import styles from './storyDisplay.module.css'
import { ChatAppContext } from '../../../Context/ChatAppContext';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Scrollbar } from 'swiper/modules';


import Chat from '../../Friend/Chat/Chat';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/scrollbar';

const StoryDisplay = ({ closeModal, stories, friendAddress, isFriend, username }) => {

  const {sendMessage} = useContext(ChatAppContext);

  const [ reply, setReply ] = useState("");

    return (
      <div className={styles.modal_container}>
            <FaTimes className={styles.closeBtn} onClick={closeModal} /> 
            <Swiper
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
            {stories.map((story, index) => (
            <div className={styles.image} key={index}>
              <SwiperSlide className={styles.storySlider}>
              <Image className={styles.storyImage}
              src={`https://gateway.pinata.cloud/ipfs/${story.content}`}
                alt={`image_${index}`}
                width={400}
                height={500}
              />
              {isFriend && 
              <div className={styles.replyContainer}>
              <input className={styles.replyInput}
              type='text' 
              placeholder='Reply to this story'
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              ></input>
               <Link href={{pathname: '/', query: {name: username, address: friendAddress}}}>
                <FaTelegramPlane className={styles.replyIcon}
                  onClick={() => sendMessage({msg: "Replied to you story : " + reply, address: friendAddress , msgType: "text"})}
              />
              </Link>
              </div>
              }
              </SwiperSlide>
            </div>
      ))}
      </Swiper>
      </div>
    );
  };
  
  export default StoryDisplay;
  