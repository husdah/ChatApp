import React, { useContext} from "react";

//INTERNAL IMPORT
import Style from './Group.module.css';
import Card from "./Card/Card";
import Chat from './Chat/Chat';
import { ChatAppContext } from '../../Context/ChatAppContext';

const Group = () => {
  const { groupList, searchGrpList, userName, loading, sendGrpMessage, readGroupMessages, groupMsg, account, setError} = useContext(ChatAppContext);
  console.log("groupList",groupList);

  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {!searchGrpList && groupList && groupList.map((el,i)=> (
            <Card 
              key={i+1}
              el={el}
              i={i}
              readGroupMessages={readGroupMessages}
            />
          ))}
          {searchGrpList && searchGrpList.map((el,i)=> (
            <Card 
              key={i+1}
              el={el}
              i={i}
              readGroupMessages={readGroupMessages}
            />
          ))} 
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendGrpMessage}
            readGroupMessages={readGroupMessages}
            groupMsg={groupMsg}
            userName={userName}
            loading={loading}
            groupList={groupList}
            account={account}
            setError={setError}
          />
        </div>
      </div>
    </div>
  )
};

export default Group;
