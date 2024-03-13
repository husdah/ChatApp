import { ethers } from 'ethers';
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from '../Context/constants';

export const CheckIfWalletConnected = async() =>{
    try {
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log("Install MetaMask");
    }
}

export const connectWallet = async() =>{
    try {
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract; 
    } catch (error) {
        console.log(error);
    }
}

export const converTime = (timestampInSeconds) => {
    const timestampInMilliseconds = timestampInSeconds * 1000; // Convert seconds to milliseconds
    const newTime = new Date(timestampInMilliseconds);

    if (isNaN(newTime.getTime())) {
        return "Invalid Timestamp";
    }

    const hours = newTime.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    const minutes = ("0" + newTime.getMinutes()).slice(-2);
    const day = ("0" + newTime.getDate()).slice(-2);
    const month = ("0" + (newTime.getMonth() + 1)).slice(-2);
    const year = newTime.getFullYear();

    return `${formattedHours}:${minutes} ${ampm} Date: ${day}/${month}/${year}`;
}