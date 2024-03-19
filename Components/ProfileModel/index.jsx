import React, { useState, useEffect } from 'react';
import Style from './ProfileModal.module.css';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { MdEdit } from "react-icons/md";

export default function ProfileModel({ closeModal, username, userImage, functionUserName, functionUserProfile }) {

    const [name, setName] = useState(username);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(`https://gateway.pinata.cloud/ipfs/${userImage}`);

    useEffect(() => {
      setName(username); 
    }, [username]);
    
    const handleNameChange = (e) => {
      setName(e.target.value); 
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl); // Update the image URL state
      setFile(file); 
    };

    return (
      <div className={Style.modal_container}>
        <div className={Style.modal}>
          <FaTimes className={Style.closeBtn} onClick={closeModal} />
          <div className={Style.modal_content}>
            <h3>Account Settings</h3>
            <div className={Style.profile_pic}>
              <label className={Style._label} htmlFor="file"> 
                <span></span>
                <span>Change</span>
              </label>
              <input 
                className={Style.profileInput} 
                id="file" 
                type="file" 
                onChange={handleFileChange}
              /> 
              <Image 
                src={imageUrl} 
                id='output' 
                layout='fill'
              /> 
            </div>
            <div className={Style.modal_content_name}>
              <input 
                type='text' 
                value={name}
                onChange={handleNameChange}
              />
              <MdEdit className={Style.edit_icon}/>
            </div>
            <div className={Style.btn_both}>
              <button className={Style.btn_editName} onClick={() => functionUserName(name)}>edit Name</button>
              <button className={Style.btn_editImage} onClick={() => functionUserProfile(file)}>edit Image</button>
            </div>
          </div>    
        </div>
      </div>
    );
}
