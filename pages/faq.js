import React from 'react';
import Style from '../styles/faq.module.css';
import { Accordion } from '../Components';
import Image from 'next/image';
import images from '../assets/index';

export default function faq() {
  return (
    <div className={Style.faq_container}>
        <div className={Style.faq_container_left}>
          <Image 
            src={images.faq}
            alt = 'faq'
            height = {400}
            width = {400}
          />
        </div>
        <div className={Style.faq_container_right}>
          <Accordion />
        </div>
        
    </div>
  )
}
