import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { FaMicrophone, FaStop } from "react-icons/fa";
import { ChatAppContext } from '../../Context/ChatAppContext';
import styles from "./RecordButton.module.css"; // Import CSS file for styling

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AudioRecording extends Component {
    state = {
        isRecording: false,
        audioData: '', // Store audio data as base64 string
        isBlocked: false,
    }

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true });
            },
        );
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true });
                })
                .catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    this.setState({ audioData: base64data, isRecording: false });
                    console.log("Audio data:", base64data);
                    this.props.setAudioBase64(base64data); // Pass base64data instead of blobURL
                };
            })
            .catch((e) => console.log(e));
    };

    render() {
        return (
        <div className={styles.recordButtonContainer}>
            {this.state.isRecording ? (
                <button className={styles.stopButton} onClick={this.stop} disabled={!this.state.isRecording}>
                <FaStop />
                </button>
            ) : (
                <button className={styles.recordButton} onClick={this.start} disabled={this.state.isRecording}>
                <FaMicrophone />
                </button>
            )}
        </div>    
        );
    }
}

const AudioRecordingWithContext = props => (
    <ChatAppContext.Consumer>
        {({ setAudioBase64 }) => <AudioRecording {...props} setAudioBase64={setAudioBase64} />}
    </ChatAppContext.Consumer>
);

export default AudioRecordingWithContext;