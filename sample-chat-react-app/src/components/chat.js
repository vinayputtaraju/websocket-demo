import React, {useCallback, useEffect, useState} from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import '../css/Samplechat.css'
import {IoIosSend} from 'react-icons/io'

function SampleChat() {
    const [chatBackendUrl, setChatBackendUrl] = useState('ws://localhost:8080/user');

    const [messageHistory, setMessageHistory] = useState([]);
    const {sendMessage, lastMessage, readyState} = useWebSocket(chatBackendUrl);

    const [message, setMessage] = useState("");

    const retryConnection = useCallback(() => {
        const r = Math.floor(Math.random() * 50);
        setChatBackendUrl(chatBackendUrl + '?tempRetry=' + r);
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev => [...prev, {message: lastMessage.data, sent: false}]));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickSendMessage = (event) => {
        event.preventDefault();
        if (null !== message && message.length !== 0) {
            setMessageHistory((prev => [...prev, {message: message, sent: true}]));
            sendMessage(message);
            setMessage("");
        }
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Active',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Inactive',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (<div className={"mainContainer"}>
            <span style={{marginBottom: 10}}>Chat session : {connectionStatus}</span>
            <br/>
            {readyState !== ReadyState.OPEN ?
                <button style={{marginBottom: 10}} onClick={retryConnection}>Retry Connection
                </button> : null}
            <form className={"sendMessageForm"} onSubmit={handleClickSendMessage}>

                <input className={"sendMessageInput"} type="text" placeholder={"Enter your message"} value={message}
                       onChange={(e) => setMessage(e.target.value)}/>
                <br/>
                <button className={"sendMessageSubmit"} type="submit" disabled={readyState !== ReadyState.OPEN}>
                    <IoIosSend className={"sendMessageIcon"}/>
                </button>
                <br/>
            </form>
            <div className={"conversionContainer"}>
                {messageHistory.map((m, idx) => (
                    <div key={idx} className={m.sent ? "messageContainer" : "messageContainerResponse"}>
                        <div key={'msgcon'.concat(idx.toString())}
                             className={m.sent ? "messageContent" : "messageContentResponse"}>
                            {m.message}
                        </div>
                    </div>))}
            </div>
        </div>

    )
}

export default SampleChat;
