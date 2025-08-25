import CONFIG from "../config";
import EventSource from "react-native-sse";
import { appActions } from "../redux/slice";

export const apiGetMessage = async (user_key, dispatch, conversation_id) => {
    const url = `${CONFIG.WEB_HOOK_URL}/conversations/${conversation_id}/listen`;
    const eventSource = new EventSource(url, {
        headers: {
            accept: "text/event-stream",
            "x-user-key": user_key,
        }
    });

    /** Listen message */
    eventSource.addEventListener("message", (event) => {
        try {
            if (event.data && event.data.length > 0) {
                const message = JSON.parse(event.data);
                if (message["data"]["isBot"] === true) {
                    console.log('data')
                    dispatch(appActions.setBotMessage(message["data"]["payload"]["text"]));
                }
            }
        } catch (error) {
            return "No message"; // Handling error case
        }
    });

    /* Check event source error */
    eventSource.addEventListener("error", () => {
        eventSource.close();
    });

    return () => {
        eventSource.close();
    };
};


export const getHistoryMessage = async (user_key,dispatch,conversation_id) =>{
    const url = `${CONFIG.WEB_HOOK_URL}/conversations/${conversation_id}/messages`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-user-key': user_key,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const messages = data.messages;

        // Dispatch bot messages to Redux store
        messages.forEach((message) => {
            if (message.isBot) {
                dispatch(appActions.setBotMessage(message.payload.text));
            }
        });

        return messages;
    } catch (error) {
        console.error('Error fetching message history:', error);
        throw error;
    }
}
