import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});