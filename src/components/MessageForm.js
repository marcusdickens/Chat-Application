import React from 'react';
import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine'
import { SendOutlined, PictureOutlined } from '@ant-design/icons';

export default function MessageForm (props){

    const [value, setValue] = useState(" ");
    const {chatId, creds} = props

    const submitHandler = (e) => {
        e.preventDefault();
        const text = value.trim()

        if(text.length > 0) sendMessage( creds, chatId, {text})
        setValue(" ")
    }
    const handleChange = (e) => {
        setValue(e.target.value)
        isTyping(props, chatId)
    }

    const handleUpload = (e) => {
        sendMessage(creds, chatId,{files: e.target.files})
    }

    return(

        <form className="message-form" onSubmit={submitHandler}>
            <input
            className="message-input" 
            placeholder="Send a Message..."
            value={value}
            onSubmit={submitHandler}
            onChange={handleChange}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>
                </span>
                <input
                    type="file"
                    multiple={false}
                    id="upload-button"
                    style={{display: 'none'}}
                    onChange={handleUpload}
                />
            </label>
            <button type="submit">
                <SendOutlined className="send-icon"/>
            </button>
        </form>
    )

}