import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { fetchUserData } from "../services/apiAccount"; // Import API function
import CONFIG from "../config";
import { RootState } from "../redux/store";


{/**Lấy data user từ API xong mới render component */}
const AccountScreen = () => {
  const sourceImage = [
    require('../assets/account.png'),
    require('../assets/chamber.jpg'),
  ];
  const navigation = useNavigation();
  const [image, setImage] = useState(sourceImage[0]);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const user_key = useSelector((state:RootState) => state.login.userKey);


  /**Fetch user data from API before render component */
  useEffect(() => {
    console.log("user_key:", user_key); // Kiểm tra giá trị user_key
    if (!user_key) {
      console.warn("user_key is undefined. Skipping API call.");
      return;
    }

    const loadUserData = async () => {
      const userData: { user?: { id?: string; name?: string; profile?: string } } = await fetchUserData(user_key);

        if (userData && userData.user) {
          setName(userData.user.id || "");
          setNickname(userData.user.name || "");
          setProfile(userData.user.profile || "");
        } else {
          console.error("Invalid API response:", userData);
        }

        setLoading(false); // Đặt loading thành false sau khi hoàn tất
    };

    loadUserData();
  }, [user_key]);


  /**Logout user */
const handleLogout = () => {
  navigation.navigate("Login" as never);
};

/**Render component */
return (
  <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="#007AFF" />
    ) : (
      <>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image source={image} style={styles.avatar} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.nickname}>{nickname}</Text>
              <Text style={styles.profileText}>{profile}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileTextContainer: {
    marginLeft: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  nickname: {
    fontSize: 18,
    color: '#666',
  },
  profileText: {
    fontSize: 16,
    color: '#999',
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  logoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountScreen;