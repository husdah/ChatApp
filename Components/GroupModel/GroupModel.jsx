import React, {useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from './GroupModel.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import {Loader} from '../../Components/index';
import MultiSelectComponent from "./MultiSelect/MultiSelectComponent";

const GroupModel = ({title, info, smallInfo, image}) => {

    const { createGroup, loading, friendLists, addedMembers, setNewGroupMembers } = useContext(ChatAppContext);
    const [name, setName] = useState("");
    const options = friendLists;

    const handleSubmit = () =>{
      if(addedMembers.length > 0){
        createGroup({name, members: addedMembers});
      }else{
        alert('you should at least add one member');
      }

      setNewGroupMembers([]);
    }
  
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700}/>
        </div>
        <div className={Style.Model_box_right}>
          <h1>{title}</h1>
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
                  <input type="text" placeholder="Group Name" onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className={Style.Model_box_right_name_info}>
                    <Image src={images.create} alt="account" width={30} height={30}/>
                    <MultiSelectComponent options={options} placeholder="add members" />
                </div>

                <div className={Style.Model_box_right_name_btn}>
                  <button onClick={handleSubmit}>
                    {""}
                    <Image src={images.send} alt="send" width={30} height={30} />
                    {""}
                    Submit
                  </button>

                  <Link href="/group">
                    <button>
                      {""}
                      <Image src={images.close} alt="close" width={30} height={30} />
                      {""}
                      Cancel
                    </button>
                  </Link>
                 
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
};

export default GroupModel;


