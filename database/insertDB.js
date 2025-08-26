import Realm from "realm";

const UserSchema = {
  name: "User",
  primaryKey: "user_id",
  properties: {
    user_id: "string",
    nickname: "string",
    profile_url: "string?",
    user_key: "string",
  },
};

const realmInstance = new Realm({
  schema: [UserSchema],
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects("User");
      const newObjects = newRealm.objects("User");

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].user_key = "";
      }
    }
  },
});

export const insertUser = (user_id, nickname, profile_url, user_key) => {
  try {
    const existingUser = realmInstance.objectForPrimaryKey("User", user_id);

    if (existingUser) {
      return existingUser;
    }

    realmInstance.write(() => {
      realmInstance.create("User", { user_id, nickname, profile_url, user_key });
    });

    return realmInstance.objectForPrimaryKey("User", user_id);
  } catch (error) {
    console.log("Error inserting user:", error);
  }
};

/**
 * 📌 Function to Update User Data
 * ✅ Updates nickname and profile picture
 */
export const updateUser = (user_id, nickname, profile_url) => {
  try {
    const user = realmInstance.objectForPrimaryKey("User", user_id);
    if (!user) {
      console.log("User not found!");
      return null;
    }

    realmInstance.write(() => {
      user.nickname = nickname;
      user.profile_url = profile_url;
    });

    return user;
  } catch (error) {
    console.log("Error updating user:", error);
  }
};

/**
 * 📌 Function to Get All Users
 */
export const getAllUsers = () => {
  try {
    const users = realmInstance.objects("User");
    console.log(users);
    return users;
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

export const getItem = (nickname, item) => {
  try {
    const user = realmInstance.objects("User");
    const len = user.length;
    if (len == 0) {
      return false;
    } else {
      for (let i = 0; i <= len; i++) {
        if (user[i]["nickname"] == nickname) {
          return user[i][item];
        }
      }
    }
    return user;
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

/**
 * 📌 Function to Delete a User
 */
export const deleteUser = (user_id) => {
  try {
    const user = realmInstance.objectForPrimaryKey("User", user_id);
    if (!user) {
      console.log("User not found!");
      return false;
    }

    realmInstance.write(() => {
      realmInstance.delete(user);
    });

    return true;
  } catch (error) {
    console.log("Error deleting user:", error);
    return false;
  }
};

export default realmInstance;
