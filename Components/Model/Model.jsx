import React, {useState, useContext} from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from './Model.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import {Loader} from '../../Components/index';

const Model = ({openBox, title, head, info, smallInfo, image, functionName, address}) => {
  
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
            <Image src={image} alt="buddy" className={Style.Model_box_left_img}/>
        </div>
        <div className={Style.Model_box_right}>
          <h1>{title} <span>{head}</span></h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {
            loading == true ? (
              <Loader />
            )
            :
            (
              <div className={Style.Model_box_right_name}>
                <div className={Style.Model_box_right_name_info}>
                  <Image src={images.username} alt="user" width={30} height={30}/>
                  <input type="text" placeholder="your name" onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className={Style.Model_box_right_name_info}>
                  <Image src={images.account} alt="account" width={30} height={30}/>
                  <input type="text" placeholder={address || "Enter address..."} onChange={(e)=> setAccountAddress(e.target.value)}/>
                </div>

                <div className={Style.Model_box_right_name_btn}>
                  <button onClick={() => functionName({name, accountAddress})} className={Style.btn_submit}>
                    {""}
                    <Image src={images.send} alt="send" />
                    {""}
                    Submit
                  </button>

                  <button onClick={() => openBox(false)} className={Style.btn_cancel}>
                    {""}
                    <Image src={images.close} alt="close" />
                    {""}
                    Cancel
                  </button>
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
};

export default Model;
