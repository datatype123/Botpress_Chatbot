import axios from "axios";
import React from "react";
import CONFIG from "../config";

export const apiService = (user_key) =>axios.create({
    baseURL:CONFIG.WEB_HOOK_URL,
    headers:{
        'x-user-key':user_key,
    },
})