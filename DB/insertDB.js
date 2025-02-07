//TODO: edit schema UserSchema 
//TODO: still error can't save data to realm 
import Realm from 'realm';

// Define the schema for the User object
const UserSchema = {
  name: 'User',
  properties: {
    user_id: 'string',
    nickname: 'string',
    access_token: 'string',
    created_at: 'date',
    is_active: 'bool',
    has_ever_logged_in:'bool',
    profile_url:'string'
  },
  primaryKey: 'user_id',
};

// Define the schema for the Message object
const MessageSchema = {
  name: 'Message',
  properties: {
    time: 'date',
    content: 'string',
    role:'string'
  },
};

// Initialize Realm with the schemas
const realm = new Realm({
  path: 'user.realm', // Define the path for the Realm database file
  schema: [UserSchema, MessageSchema],
  schemaVersion:2,
  migration: (oldRealm, newRealm) => {
    // only apply this migration if the schema version is less than 2
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects('User');

      // loop through all objects and set the new property
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].has_ever_logged_in = false; // Example: Initialize to false
        newObjects[i].profile_url = ""; // Example: Initialize to an empty string
      }
    }
  },
});

// Function to add a new user to the Realm database
const addUser = (user_id, nickname, access_token, created_at, is_active,has_ever_logged_in,profile_url) => {
  let newUser; // Declare newUser outside realm.write

  realm.write(() => {
    realm.create('User', {
      user_id: user_id,
      nickname: nickname,
      access_token: access_token,
      created_at: created_at,
      is_active: is_active,
      has_ever_logged_in:has_ever_logged_in,
      profile_url:profile_url,
    });
    console.log(`created new user`);
  });

  // Check if users exist AFTER the write transaction
  const hasUsers = checkClassExist('User'); // Call checkClassExist *after* adding the user
  if (hasUsers) {
    console.log('Have User');
    // You can't access UserSchema directly like that. If you want to check the schema, do it outside.
  } else {
    console.log("Don't have users");
  }
};

// Function to add a new message to the Realm database
const addMessage = (time, content) => {
  realm.write(() => {
    const newMessage = realm.create('Message', {
      time: time,
      content: content,
    });
    console.log(`created new message: ${newMessage}`);
  });
};

const checkClassExist = (className) => {
  const objects = realm.objects(className).filtered('user_id == "Astra"');
  console.log(objects[0]);
  return objects.length > 0;
};

// Example usage - moved here so it runs only when the module is loaded.
// const hasUsers = checkClassExist('User');  //Remove this line because it's always initialized when loading modules
// if (hasUsers) {
//   console.log('Have User');
//   console.log(hasUsers);
// } else {
//   console.log("Don't have users");
// }

export default addUser;
