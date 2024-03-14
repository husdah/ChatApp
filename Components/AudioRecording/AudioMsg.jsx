import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AudioMsg = ({ audioDataHash }) => {
    const [audioData, setAudioData] = useState('');

    useEffect(() => {
        const getJSONFromIPFS = async (ipfsHash) => {
            const gatewayUrl = 'https://magenta-obliged-rodent-373.mypinata.cloud'; // Replace with your actual dedicated gateway URL
            const accessToken = 'TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd';
            
            fetch(`${gatewayUrl}/ipfs/${ipfsHash}?pinataGatewayToken=${accessToken}`)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData.base64);
                console.log("responseData", jsonData.base64);
                setAudioData(jsonData.base64); // Set audio data after fetching
            })
            .catch(error => {
                console.error('Error fetching IPFS content:', error);
            });
        };

        getJSONFromIPFS(audioDataHash); // Call the function immediately
    }, [audioDataHash]);

    return (
        audioData ? ( // Conditional rendering: render audio only when audioData is available
            <audio src={audioData} controls="controls" />
        ) : null
    );
}

export default AudioMsg;