//TODO: sua lai header bar gom 3 item chinh: nut back, ten screen va nut account
//TODO: viet code cho acccount screen

import { useNavigation } from '@react-navigation/native';
import React,{useRef,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle,DrawerLayoutAndroid } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlyphMap, IconButtonProps, IconProps } from '@expo/vector-icons/build/createIconSet';

/*interface Header */
interface HeaderBarProps  {
  isHide: boolean
  title: string;
  style?: StyleProp<ViewStyle>;
  onProfilePress?: () => void;
  onBackPressLeft?: () => void;
  onBackPressRight?: ()=> void;
  icon:String;
  iconLeft:String;
  iconRight: String
  
}

/* interface Button*/
interface ButtonProps extends Pick<HeaderBarProps,'isHide'|'onBackPressLeft'|'icon'|'onBackPressRight'>{
}

const Button: React.FC<ButtonProps> =({isHide,onBackPressLeft,onBackPressRight,icon})=>{
  const navigation = useNavigation();

  /*back button when login screen, hided and Sign Up screen, visibled */
  if (!isHide) return <View style={styles.hidden}></View>

  return (
    <TouchableOpacity onPress={onBackPressLeft} style={styles.backButton}>
      <Ionicons name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
}


/*Component Header */
const HeaderBar: React.FC<HeaderBarProps> = ({ title, style, onProfilePress, onBackPressLeft,onBackPressRight,isHide ,iconLeft,iconRight}) => {
  const isHideMain = title=='Chat' ? true:false;
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button isHide={false} icon={'close'} onBackPressLeft={()=>drawer.current?.closeDrawer()} ></Button>
    </View>
  );
  return (
    <View style={[styles.headerContainer, style]}>
      {/* Left Button (Optional) */}
      <Button isHide={isHideMain} onBackPressLeft={onBackPressLeft} icon={iconLeft}></Button>

      {/* Title */}
      
      <Text style={styles.title}>{title}</Text>

      {/** Right Button */}
      <Button isHide={isHideMain} onBackPressRight={onBackPressRight} icon={iconRight}></Button>

      
    </View>
  );
};

// **💎 Styled HeaderBar**
const styles = StyleSheet.create({
  headerContainer: {
    paddingTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007AFF',
    height: 120,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  hidden :{
    width:0,
    height:0
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  profileButton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  profileIcon: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default HeaderBar;
