import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';

//INTERNAL IMPORT 
import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children})=>{
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');

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
            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //GET ALL APP USER LIST
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
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

    //CREATE ACCOUNT
    const createAccount = async({name, accountAddress})=>{
        try {
           /*  if(name || accountAddress) return setError("Name And AccountAddress, cannot be empty"); */
           
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
    const addFriends = async({name, accountAddress}) =>{
        try {
            /* if(name || accountAddress) return setError("Name And AccountAddress, cannot be empty"); */

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friends, try again.")
        }
    }

    //SEND MESSAGE TO YOUR FRIEND 
    /* const sendMessage = async({msg, address})=>{
        try {
            //if(msg || address) return setError("Please Type your Message");

            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload and try again.");
        }
    } */

    // SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async ({ msg, address, file, msgType }) => {
        try {
        const contract = await connectingWithContract();
        let fileHash = '';
        let message = '';
        let type = msgType;

        if(msg){
            message = msg;
        }

        if (file) {
           // fileHash = await addToIPFS(file);
           fileHash = await pinFileToIPFS(file);
        }

        const addMessage = await contract.sendMessage(address, message, fileHash, type);
        setLoading(true);
        await addMessage.wait();
        setLoading(false);
        window.location.reload();
        } catch (error) {
            /* setError("Please reload and try again."); */
            setError(error.message);
        }
    };

    //READ INFO
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        //setUserName(userName);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
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

    return(
        <ChatAppContext.Provider value={
            {
                readMessage, 
                createAccount, 
                addFriends, 
                sendMessage, 
                readUser,
                connectWallet,
                CheckIfWalletConnected,
                account,
                userName,
                friendLists,
                friendMsg,
                loading,
                userLists,
                error,
                currentUserName,
                currentUserAddress
            }}>
            {children}
        </ChatAppContext.Provider>
    )
}
