import React from 'react'
import {GroupModel} from '../Components/index';
import images from '../assets';

const addGroup = () => {
  return (
    <div>
        <GroupModel
            title= "Create Group"
            info= 'you need to choose group name and select initial members'
            smallInfo= "Kindley set a group name..."
            image= {images.accountBg}
        />
    </div>
  )
}

export default addGroup