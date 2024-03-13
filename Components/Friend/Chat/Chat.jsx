import React,{useEffect, useState} from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import FsLightbox from "fslightbox-react";
import { FaImage, FaFilePdf, FaFile } from "react-icons/fa"
import { IoMdAttach } from "react-icons/io"

//INTERNAL IMPORT
import Style from './Chat.module.css';
import Style2 from './FileLabel.module.css';
import images from '../../../assets';
import { converTime } from '../../../Utils/apiFeature';
import { Loader } from '../../index';

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser
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
    } else {
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
    const clickedImageSource = `https://gateway.pinata.cloud/ipfs/${friendMsg[imageIndex].fileHash}`;
  
    setLightboxController({
      toggler: !lightboxController.toggler,
      sources: [clickedImageSource],
    });
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

  console.log("friendMsg",friendMsg);
  
  return (
    <div className={chatData.name && chatData.address ? Style.Chat : Style.ChatHidden}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
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
                      <Image src={images.accountName} alt="image" width={50} height={50} />
                      <span>
                        {chatData.name} {""}
                        <small>Time: {converTime(el.timestamp)}</small>
                      </span>
                    </div>
                  ) : (
                    <div className={Style.Chat_box_left_title}>
                      <Image src={images.accountName} alt="image" width={50} height={50} />
                      <span>
                        {userName} {""}
                        <small>Time: {converTime(el.timestamp)}</small>
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

            {el.fileHash && el.msgType === "image" ? (
              <div onClick={() => openLightboxForImage(i)}>
                <Image
                  src={`https://gateway.pinata.cloud/ipfs/${el.fileHash}`}
                  alt="image"
                  width={100}
                  height={100}
                />
              </div>
            ) : el.fileHash && el.msgType === "file" ? (
              <a href={`https://gateway.pinata.cloud/ipfs/${el.fileHash}`} target="_blank" download={true}>
                <FaFile size={100} />
              </a>
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

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
            
              <input className={Style.inputMsg} type="text" placeholder="type your message" onChange={(e) => setMessage(e.target.value)} />
              
              <label className={Style2.filelabel} style={{ border: `2px solid ${fileLabelColor}` }}>
              {
                fileType === "image" ? <FaImage /> : 
                fileType === "pdf" ? <FaFilePdf /> : 
                fileType === "dox" ? <FaFile /> :
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
                    onClick={() => {functionName({ msg: message, address: router.query.address, file, msgType: msgType }), console.log("msgType",msgType)}}
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
