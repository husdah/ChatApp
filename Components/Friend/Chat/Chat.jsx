import React,{useEffect, useState, useContext} from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import FsLightbox from "fslightbox-react";
import { FaImage, FaFilePdf, FaFile, FaFileVideo, FaUserCircle } from "react-icons/fa"
import { IoMdAttach } from "react-icons/io"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

//INTERNAL IMPORT
import Style from './Chat.module.css';
import Style2 from './FileLabel.module.css';
import images from '../../../assets';
import { converTime } from '../../../Utils/apiFeature';
import { Loader, AudioRecording, AudioMsg } from '../../index';
import { ChatAppContext } from '../../../Context/ChatAppContext';

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  currentUserImage,
  readUser,
  setError,
  userImage
}) => {

  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [msgType, setMsgType] = useState("text");
  const [fileLabelColor, setFileLabelColor] = useState("");
  const [chatData, setChatData] = useState({
    name: '',
    address: ''
  });

  const { audioData, setAudioBase64 } = useContext(ChatAppContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const oldFileName = fileName;
    const newFileName = e.target.value.split("\\").pop();
    const extension = newFileName.split(".").pop();

    if (oldFileName === newFileName) {
      return false;
    }

    setFileName(newFileName);

    if (["jpg", "jpeg", "png"].includes(extension)) {
      setFileType("image");
      setMsgType("image");
      setFileLabelColor("#208440");
    } else if (extension === "pdf") {
      setFileType("pdf");
      setMsgType("file");
      setFileLabelColor("red");
    } else if (["doc", "docx"].includes(extension)) {
      setFileType("dox");
      setMsgType("file");
      setFileLabelColor("#2388df");
    } else if (extension === "mp4") {
      setFileType("video");
      setMsgType("video");
      setFileLabelColor("#208440");
    }
     else {
      setFileType("file");
      setMsgType("text");
      setFileLabelColor("black");
    }
  };

  const [lightboxController, setLightboxController] = useState({
		toggler: false,
		sources: []
	});

  const openLightboxForImage = (imageIndex) => {
    const clickedImageSource = `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${friendMsg[imageIndex].fileHash}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd`;
  
    setLightboxController({
      toggler: !lightboxController.toggler,
      sources: [clickedImageSource],
    });
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { name, address } = router.query;

    if (name && address) {
        setChatData({ name, address });
        readMessage(address);
        readUser(address);
    }

}, [router.isReady, router.query.address]);

  useEffect(() => {
    const sendMessageWithAudio = async () => {
      if (audioData) {
        console.log(audioData);
        await functionName({ msg: message, address: router.query.address, file, audioData: audioData, msgType: 'audio' });
        console.log("msgType",msgType);
        setMessage("");
        setFile(null);
        setFileName("");
        setFileType("");
        setMsgType("text");
        setFileLabelColor("");
        setAudioBase64('');
      }
    };

    sendMessageWithAudio(); // Call the async function immediately
  }, [audioData]);

  console.log("friendMsg",friendMsg);

  const sendMessage = async () =>{
    if(!message && !file && !audioData){
      setError("Please enter a message");
    }else{
      await functionName({ msg: message, address: router.query.address, file, audioData: audioData, msgType: msgType });
      console.log("msgType",msgType);
      setMessage("");
      setFile(null);
      setFileName("");
      setFileType("");
      setMsgType("text");
      setFileLabelColor("");
    }
  }
  
  return (
    <div className={chatData.name && chatData.address ? Style.Chat : Style.ChatHidden}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={currentUserImage ? `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${currentUserImage}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd` : images.accountName} alt="image" width={70} height={70} style={{borderRadius: "50%"}} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <small className={Style.show}>{currentUserAddress}</small>
          </div>
        </div>
      ): ""}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            
            {friendMsg.map((el, i) => (
              <div key={i + 1}>
                  {el.sender === chatData.address ? (
                    <div className={Style.Chat_box_left_title}>
                      <Image src={currentUserImage ? `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${currentUserImage}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd` : images.accountName} alt="image" width={50} height={50} style={{borderRadius: "50%"}}/>
                      <span>
                        {chatData.name} {""}
                        <small className={Style.time}>Time: {converTime(el.timestamp)}</small>
                      </span>
                    </div>
                  ) : (
                    <div className={Style.Chat_box_left_title}>
                      <Image src={userImage ? `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${userImage}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd` : images.accountName} alt="image" width={50} height={50} style={{borderRadius: "50%"}}/>
                      <span>
                        {userName} {""}
                        <small className={Style.time}>Time: {converTime(el.timestamp)}</small>
                      </span>
                    </div>
                  )}

                  {el.msg && (
                    <p key={i + 1} className={el.sender === chatData.address ? Style.msgR : Style.msgS}>
                      {el.msg}
                      {""}
                      {""}
                    </p>
                  )}

                {
                  el.audioData && (
                    <AudioMsg audioDataHash={el.audioData} />
                  )
                }

            {el.fileHash && el.msgType === "image" ? (
              <div onClick={() => openLightboxForImage(i)}>
                <Image
                  src={`https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${el.fileHash}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd`}
                  alt="image"
                  width={100}
                  height={100}
                />
              </div>
            ) : el.fileHash && el.msgType === "file" ? (
              <a href={`https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${el.fileHash}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd`} target="_blank" download={true}>
                <FaFile size={100} />
              </a>
            ) : el.fileHash && el.msgType === "video" ? (
              <div onClick={() => openLightboxForImage(i)}>
                <FaFileVideo size={100} />
              </div>
            ) : null}

              </div>
          ))
          }
            
          </div>
        </div>

        <FsLightbox
            toggler={lightboxController.toggler}
            sources={lightboxController.sources}
        />

        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setMessage(prevMessage => prevMessage + emoji.native)}
            showPreview={false}
            showSkinTones={false}
            autoFocus={true}
            emojiSize={24}
          />
        )}

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              
              <Image
                src={images.smile}
                alt="smile"
                width={50}
                height={50}
                onClick={toggleEmojiPicker}
              />

              <AudioRecording />
              
              <input className={Style.inputMsg} type="text" placeholder="type your message" value={message} onChange={(e) => setMessage(e.target.value)} />

              <label className={Style2.filelabel} style={{ border: `2px solid ${fileLabelColor}` }}>
              {
                fileType === "image" ? <FaImage /> : 
                fileType === "pdf" ? <FaFilePdf /> : 
                fileType === "dox" ? <FaFile /> :
                fileType === "video" ? <FaFileVideo /> :
                <IoMdAttach />
              }
              <span className={Style2.title} style={{ color: fileLabelColor }}>
                {fileName ? (fileName.length > 10 ? `${fileName.slice(0, 4)}...${fileName.split('.').pop()}` : fileName) : "File"}
              </span>
              <input className={Style2.FileUpload1} id="FileInput" name="booking_attachment" type="file" onChange={handleFileChange} />
            </label>
              
              {
                loading == true ? (
                  <Loader />
                ) : (
                  <Image 
                    src={images.send} 
                    alt="send" 
                    width={50} 
                    height={50}
                    onClick={sendMessage}
                  />
                )
              }
            </div>
          </div>
        ): ""}

      </div>
    </div>
  )
};

export default Chat;
