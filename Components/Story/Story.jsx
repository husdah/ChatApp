import React, {useContext, useState} from 'react';
import styles from './stroy.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import Image from 'next/image';
import images from '../../assets';
import PopUp from './popUp/popUp';
import { ChatAppContext } from '../../Context/ChatAppContext';
import StoryDisplay from './storyDisplay/StoryDisplay';

const Story = ({storyList, username, friendAddress, isFriend}) => {
    const [showModal, setShowModal] = useState(false);
    const [showStory, setShowStory] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    const{ friendLists, friendStoryList} = useContext(ChatAppContext);

    // Function to handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Set selected image
                setShowModal(true); // Show modal
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.story}>
            <div className={styles.storyContainer}>
                <div className={styles.storyCircle} onClick={() => setShowStory(true)}>
                    <Image src={images.avatar} alt="Story" className={styles.storyImage} />
                </div>
                {!isFriend &&
                <div className={styles.round}>
                    <FaPlusCircle className={styles.addButton} onClick={() => document.getElementById('FileInput').click()} />
                    <input
                        className={styles.FileUpload}
                        id="FileInput"
                        name="booking_attachment"
                        type="file"
                        onChange={handleFileChange} // Handle file input change
                    />
                </div>
                }
                {showModal && (
                    <PopUp
                        file={file}
                        image={selectedImage}
                        closeModal={() => {
                            setShowModal(false);
                            setSelectedImage(null);
                        }}
                    />
                )}
                {showStory && (
                    <StoryDisplay
                        stories = {storyList}
                        friendAddress = {friendAddress}
                        isFriend = {isFriend}
                        username={username}
                        closeModal={() => {
                            setShowStory(false);
                        }}
                    />
                )}
            </div>
            <div className={styles.usernameOverlay}>
               {username}
            </div>
        </div>
    );

}

export default Story;