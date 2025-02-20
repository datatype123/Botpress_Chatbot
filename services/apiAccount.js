// apiService.js
import CONFIG from "../config";

export const fetchUserData = async (user_key) => {
  try {
      

    const response = await fetch(`${CONFIG.WEB_HOOK_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-user-key": user_key, // Ensure userKey is passed correctly
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
    }

    const data = response.json();
      
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
