import Realm, { ObjectSchema } from "realm";
import { createRealmContext } from '@realm/react';


const UserSchema: ObjectSchema = {
  name: "User",
  primaryKey: "user_id", // 🔹 Thêm khóa chính để đảm bảo dữ liệu duy nhất
  properties: {
    user_id: "string",
    nickname: "string",
    access_token: "string",
    created_at: "date",
    profile_url: "string",
  },
};


const { RealmProvider, useRealm, useQuery } = createRealmContext({
  schema: [UserSchema],
  schemaVersion: 1,
});

const addUser = (realm: Realm) => {
  try {
    realm.write(() => {
      realm.create("User", {
        user_id: "Jacob",
        nickname: "Jacob",
        access_token: "asjdasd",
        created_at: new Date(),
        profile_url: "https://www.google.com",
      });
    });
    console.log("✅ User đã được lưu vào Realm!");
  } catch (error) {
    console.error("❌ ", error);
  }
};

export { RealmProvider, useRealm, useQuery, addUser };
