import CONFIG from "../config";
import EventSource from "react-native-sse";
import { setBotMessage } from "../redux/slice";

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
                    dispatch(setBotMessage(message["data"]["payload"]["text"]));
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
