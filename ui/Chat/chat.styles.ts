import {StyleSheet} from 'react-native';


export const markdownStyles = StyleSheet.create({
  text: { color: '#333', fontSize: 16 },
  heading1: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  heading2: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  strong: { fontWeight: 'bold', color: '#000' },
  em: { fontStyle: 'italic', color: '#666' },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
  code_inline: { backgroundColor: '#f4f4f4', padding: 4, borderRadius: 4, color: '#D63384' },
});

export const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#f4f6f9' },
  container: { flex: 1, padding: 15, backgroundColor: '#f4f6f9' },
  messageContainer: {
    marginVertical: 10,
    // marginHorizontal: 20,
    // padding: 12,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginHorizontal: 10,
    borderColor: '#E07A5F',
    borderWidth: 1,
  },
  messageContent: { flex: 1, marginHorizontal: 10 },
  user: { fontWeight: 'bold', color: '#007AFF' },
  botText: { color: '#34A853' },
  message: { fontSize: 16, color: '#333', marginTop: 5 },
  botMessageText: { color: '#555' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    paddingVertical: 12,
    // backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfoContainer: {
    flex: 1,
    width: '100%',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  date:{
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    justifyContent: 'flex-start',
  },
  time:{
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    justifyContent: 'flex-end',
  }
});