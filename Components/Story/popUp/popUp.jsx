import React, { useState, useEffect, useContext} from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import images from '../../../assets'
import styles from './popUp.module.css'
import { ChatAppContext } from '../../../Context/ChatAppContext';


const PopUp = ({ file, closeModal , image}) => { 

  const {sendStory} = useContext(ChatAppContext);

  const handleSendStory = async () => {
    try {
      await sendStory({ file: file });
      closeModal();
    } catch (error) {
      console.error("Error sending story:", error);
      // Handle error here
    }
  };

    return (
      <div className={styles.modal_container}>
        <div className={styles.modal}>
            <FaTimes className={styles.closeBtn} onClick={closeModal} /> 
            <div className={styles.image}>
            <Image src={image}  width={400} height={400} />
            </div>
            <button onClick={handleSendStory}>Send Story</button>
        </div>
      </div>
    );
  };
  
  export default PopUp;
  