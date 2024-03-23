import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';

//INTERNAL IMPORT 
import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children})=>{
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [audioData, setAudioData] = useState('');
    const [fileStory, setFileStory] = useState('');
    const [storyList, setStoryList] = useState([]);
    const [friendStoryList, setFriendStoryList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [addedMembers, setAddedMembers] = useState([]);
    const [searchGrpList, setSearchGrpList] = useState([]);
    const [groupMsg, setGroupMsg] = useState([]);

    //CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');
    const [currentUserImage, setCurrentUserImage] = useState('');

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () =>{
        try {
            //GET CONTRACT
            const contract = await connectingWithContract();
            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //GET USER NAME
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            //GET USER IMAGE
            const userImage = await contract.getUserImage(connectAccount);
            setUserImage(userImage);
            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //GET ALL APP USER LIST
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
            //GET USER STORY
            const storyList = await contract.getMyStories();
            setStoryList(storyList);
            //GET FRIENDS STORY
            const allFriendStories = [];
            // Iterate over each friend object
            for (const friend of friendLists) {
                //GET FRIEND'S STORY
                const friendStoryList = await contract.getFriendStories(friend.pubkey);
                // Add friend's stories to the array along with the friend's name
                allFriendStories.push({ friendName: friend.name, stories: friendStoryList, friendAddress: friend.pubkey });
            }
            // Set all friend stories
            setFriendStoryList(allFriendStories);
            //GET GROUPS FOR USER
            const groups = await contract.getGroupsForUser(connectAccount);
            setGroupList(groups);
        } catch (error) {
            //setError("Please Install And Connect Your Wallet");
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchData();
    },[]);

    //READ MESSAGE
    const readMessage = async(friendAddress)=>{
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            //setError("Currently You Have no Message");
            console.log("Currently You Have no Message");
        }
    }

    //DELETE CHAT
    const clearChat = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const clear = await contract.clearChat(friendAddress);
            await clear.wait();
            setFriendMsg([]);
        } catch (error) {
            setError("Error while clearing the chat. Please try again.");
        }
    };

    //CREATE ACCOUNT
    const createAccount = async({name, accountAddress})=>{
        try {
            if (!name) return setError("Name cannot be empty");
           
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            /* setError("Error while creating your account. Please reload the browser.") */
            setError(error.message);
        }
    }


    //ADD YOUR FRIENDS
    const addFriends = async({name, accountAddress, profileImage}) =>{
        try {
            /* if(name || accountAddress) return setError("Name And AccountAddress, cannot be empty"); */

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name, profileImage);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friends, try again.")
        }
    }

    // Search Freinds List 
    const searchFriendList = async (search) => {
        try {
        const contract = await connectingWithContract();
        const allFriends = await contract.getMyFriendList();
    
        const filteredFriends = allFriends.filter(friend => {
            return friend.name.toLowerCase().includes(search.toLowerCase());
        });
    
        setSearchList(filteredFriends);
        } catch (error) {
        setError("Please reload and try again.");
        }
    }

    // SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async ({ msg, address, file, audioData, msgType }) => {
        try {
        const contract = await connectingWithContract();
        let fileHash = '';
        let message = '';
        let type = msgType;
        let audio = '';

        if(msg){
            message = msg;
        }

        if (file) {
           fileHash = await pinFileToIPFS(file);
        }

        if (audioData) {
            audio = await pinBase64ToIPFS(audioData);
        }

        const addMessage = await contract.sendMessage(address, message, fileHash, audio, type);
        setLoading(true);
        await addMessage.wait();
        setLoading(false);
        readMessage(address);
        } catch (error) {
            /* setError("Please reload and try again."); */
            setError(error.message);
        }
    };

    //SEND STROY
    const sendStory = async ({ file }) => {
        try {
        const contract = await connectingWithContract();
        console.log(file)
        let fileHash = '';

        if (file) {
           fileHash = await pinFileToIPFS(file);
        }

        const addImageStory = await contract.addImageStory(fileHash);
        setLoading(true);
        await addImageStory.wait();
        setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    };

    //Get My stories


    //READ INFO
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        const userImage = await contract.getUserImage(userAddress);
        //setUserName(userName);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
        setCurrentUserImage(userImage);
    }  

    const pinFileToIPFS = async (file) => {
        try{
            const fileData = new FormData();
            fileData.append("file", file);

            const responseData = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: fileData,
                headers: {
                    pinata_api_key: "4c6574add2a3c92b4109",
                    pinata_secret_api_key: "99a2c20a81fa3c47c96d2efc77a9e3c6ba87ef37b4bcb30a0f807fdfb05365ba",
                    "Content-Type": "multipart/form-data",
                }
            });
            const fileHash = responseData.data.IpfsHash;
            return fileHash;
        }catch(err){
            console.log(err);
        }
    }


    const pinBase64ToIPFS = async (base64Data) => {
        try{

            const pinataApiKey = '4c6574add2a3c92b4109';
            const pinataSecretApiKey = '99a2c20a81fa3c47c96d2efc77a9e3c6ba87ef37b4bcb30a0f807fdfb05365ba';
    
            const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    
            // Define your JSON data
            const jsonData = {
                base64: base64Data
            };
    
            const headers = {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
                'Content-Type': 'application/json'
            };

            const responseData = await axios.post(url, jsonData, { headers });
            const fileHash = responseData.data.IpfsHash;
            return fileHash;
        }catch(err){
            console.log(err);
        }
    }

    const setAudioBase64= (base64) =>{
        setAudioData(base64);
    }

    const createGroup = async({name, members}) =>{
        try {
            const contract = await connectingWithContract();
            const createGroup = await contract.createGroup(name, members);
            setLoading(true);
            await createGroup.wait();
            setLoading(false);
            router.push('/group');
            getGroupsForUser();
        } catch (error) {
            //setError("Something went wrong while creating group, try again.")
            setError(error.message);
        }
    }

    const getGroupsForUser = async()=>{
        try {
            const contract = await connectingWithContract();
            const groups = await contract.getGroupsForUser(account);
            setGroupList(groups);
            //return groups;
            console.log("grps",groups);
        } catch (error) {
            console.log(error);
        }
    }

    const setNewGroupMembers= async(members) =>{
        setAddedMembers(members);
    }

    // Search GROUP List 
    const searchGroupList = async (search) => {
        try {
        const contract = await connectingWithContract();
        const connectAccount = await connectWallet();
        const myGroups = await contract.getGroupsForUser(connectAccount);
    
        const filteredGroups = myGroups.filter(group => {
            return group.name.toLowerCase().includes(search.toLowerCase());
        });
    
        setSearchGrpList(filteredGroups);
        } catch (error) {
        setError("Please reload and try again.");
        }
    }

    const sendGrpMessage = async ({ msg, address, file, audioData, msgType }) => {
        try {
        const contract = await connectingWithContract();
        let fileHash = '';
        let message = '';
        let type = msgType;
        let audio = '';

        if(msg){
            message = msg;
        }

        if (file) {
           fileHash = await pinFileToIPFS(file);
        }

        if (audioData) {
            audio = await pinBase64ToIPFS(audioData);
        }

        console.log("msg: ",msg,"grpAddress: ",address,"file: ",fileHash, "audioData: ", audio, "msgType: ", type)
        const addMessage = await contract.sendGrpMessage(address, message, fileHash, audio, type);
        setLoading(true);
        await addMessage.wait();
        setLoading(false);
        readGroupMessages(address);
        } catch (error) {
            /* setError("Please reload and try again."); */
            setError(error.message);
        }
    };

    //READ MESSAGE
    const readGroupMessages = async(groupHash)=>{
        try {
            console.log("groupHash",groupHash);
            const contract = await connectingWithContract();
            const read = await contract.readGroupMessages(groupHash);
            console.log("grpMessage",read);
            setGroupMsg(read);
        } catch (error) {
            //setError("Currently You Have no Message");
            console.log(error.message);
        }
    }

    // UPDATE USERNAME
    const updateUsername = async (newUsername) => {
        try {
            if (!newUsername) return setError("Name cannot be empty");
            const contract = await connectingWithContract();
            const newName = await contract.updateUsername(newUsername);
            setLoading(true);
            await newName.wait();
            setLoading(false);
            setUserName(newUsername);
            //window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    }

    // UPDATE USERNAME
    const updateUserProfileImage = async (file) => {
        try {
            if (file) {
                const fileHash = await pinFileToIPFS(file);
             
                //if (!newPofileImage) return setError("Name cannot be empty");
                const contract = await connectingWithContract();
                const newProfileImage = await contract.updateProfileImage(fileHash);
                setLoading(true);
                await newProfileImage.wait();
                setLoading(false);
                setUserImage(fileHash);
            }
            //window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <ChatAppContext.Provider value={
            {
                readMessage, 
                createAccount, 
                addFriends, 
                sendMessage, 
                sendStory,
                readUser,
                connectWallet,
                CheckIfWalletConnected,
                account,
                userName,
                userImage,
                friendLists,
                friendMsg,
                loading,
                userLists,
                error,
                storyList,
                friendStoryList,
                currentUserName,
                currentUserAddress,
                currentUserImage,
                searchFriendList,
                searchList,
                clearChat,
                audioData,
                setAudioBase64,
                createGroup,
                getGroupsForUser,
                groupList,
                setNewGroupMembers,
                addedMembers,
                searchGroupList,
                searchGrpList,
                sendGrpMessage,
                readGroupMessages,
                groupMsg,
                updateUsername,
                updateUserProfileImage,
                setError
            }}>
            {children}
        </ChatAppContext.Provider>
    )
}
