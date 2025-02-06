import React, { useState } from "react";
import axios from "axios";
import CONFIG from "../config";
import { Header } from "react-native/Libraries/NewAppScreen";

interface props {
    message: string,
    user_id: string,
    reply: string,
}

const Headers = {
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': CONFIG.SENDBIRD_API_TOKEN,
    },
};

const post =async (message:string)=> {
    const data ={
        "messages": [{
            "role":"user",
            "content":message
        }
        ],
        "use_streaming_response": false
    }
    try {
        const response = await axios.post(`${CONFIG.BASE_URL}/bots/${CONFIG.BOT_USER_ID}/ai_chatbot_replies`,data,Headers)
        console.log(response.data['reply_messages'])
        return (response.data['reply_messages'])
    } catch (error) {
        console.log(error)
        return "Error message";
    }
}

export default post;
